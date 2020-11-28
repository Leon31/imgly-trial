import classnames from 'classnames';
import { useState, useRef, useEffect } from 'react';
import { getSelectionEnd, getSelectionStart, getCaretPosition } from "./caret";


// Call to fill the first time the storage

// function setMockStorage(text, ranges) {
//   window.localStorage.setItem('text',JSON.stringify({text, ranges}))
// }
// const mocksString = 'A string that says something in English so I can tell better if it is breaking or not';
// const mockRanges = new Array(mocksString.length-1).fill('');
// setMockStorage(mocksString,mockRanges); 

function Editor() {
  const [text, setText] = useState('');
  const [ranges, setRanges] = useState([]);
  const [style, setStyle] = useState({})
  const input = useRef();

  useEffect(() => {
    const prevText = JSON.parse(window.localStorage.getItem('text'));
    setText(prevText.text)
    setRanges(prevText.ranges)
  },[])

  useEffect(() => {
    window.localStorage.setItem('text',JSON.stringify({text, ranges}))
  }, [text, ranges])

  function setStyleSelection (style) {
    const start = getSelectionStart(input.current)
    const end = getSelectionEnd(input.current);

    const newRanges = ranges[start] && ranges[start].includes(style)
      ? removeRanges(ranges, start, end, style)
      : addRanges(ranges, start, end, style)
    if (!newRanges) return console.error('Error', 'start:', start, 'end:', end)
    setRanges([...newRanges]);
  } 

  function selection () {
    let index = getCaretPosition(input.current);
    if (!ranges[index]) return setStyle({});
    const styles = ranges[index].split(' ');
    setStyle(styles.reduce((acc, key) => {
      acc[key] = true;
      return acc;
    },{}))
  }


  return (
    <>
      <div className="buttons">
        <Button setStyleSelection={setStyleSelection} styleName="bold" icon="B" active={style.bold}/> 
        <Button setStyleSelection={setStyleSelection} styleName="italic" icon="I" active={style.italic}/> 
        <Button setStyleSelection={setStyleSelection} styleName="underline" icon="U" active={style.underline}/> 
      </div>
      <div ref={input} onSelect={selection} className="editor" contentEditable="true" cols="30" rows="10" suppressContentEditableWarning={true}>
        {renderText(text, ranges)}
      </div>
    </>
  );
}

function Button ({styleName, setStyleSelection, icon, active}) {
  return (
    <button 
      style={{background: active ? '#eee' : '#fff'}} 
      onClick={()=>setStyleSelection(styleName)} >
        <span className={styleName}>{icon}</span>
    </button> 
  )
}

function addRanges (ranges, s, e, style) {
  for (let i = s; i < e && i < ranges.length; i++) {
    const styles = ranges[i].split(' ');
    const {bold='', italic='', underline=''} = styles.reduce((acc, styleName) => {
      acc[styleName] = styleName;
      return acc;
    },{[style]:style})

    ranges[i] = `${bold} ${italic} ${underline}`;
  }

  return ranges;
}

function removeRanges (ranges, s, e, style) {
  for (let i = s; i < e && i < ranges.length; i++) {
    const styles = ranges[i].split(' ').filter(styleName => styleName !== style);
    ranges[i] = styles.join(' ');
  }

  return ranges;
}

function renderText (text, ranges) {
  let chunk = '';
  const res = [];
  let current = ranges[0];

  for (let i = 0; i < text.length; i++) {
    chunk += text[i];
    
    if (ranges[i+1] !== current) {
      const span = <span key={i} className={classnames(ranges[i])}>{chunk}</span>
      res.push(span);
      
      current = ranges[i+1];
      chunk = '';
    }
  }
  res.push(chunk);
  return res;
}

export default Editor;
