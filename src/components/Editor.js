import { useState, useRef, useCallback } from 'react';
import { getSelectionEnd, getSelectionStart, getCaretPosition } from "../utils/caret";
import StyleButton from "./StyleButton";
import ContentEditable from "./ContentEditable";

const mocksString = 'A string that says something in English so I can tell better if it is breaking or not';
const mockRanges = new Array(mocksString.length).fill('');

function Editor() {
  const text = useRef(mocksString);
  const [ranges, setRanges] = useState(mockRanges);
  const [style, setStyle] = useState({})
  const input = useRef({});

  function setStyleSelection (style) {
    const start = getSelectionStart(input.current);
    const end = getSelectionEnd(input.current);
    const newRanges = ranges[start] && ranges[start].includes(style)
      ? removeRanges(ranges, start, end, style)
      : addRanges(ranges, start, end, style)
    if (!newRanges) return console.error('Error', 'start:', start, 'end:', end)
    setRanges([...newRanges]);
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

  const getCurrentStyle = useCallback(() => {
    let index = getCaretPosition(input.current);
    if (!ranges[index]) return setStyle({});
    const styles = ranges[index].split(' ');
    setStyle(styles.reduce((acc, key) => {
      acc[key] = true;
      return acc;
    },{}))
  },[ranges])

  return (
    <>
      <div className="buttons">
        <StyleButton setStyleSelection={setStyleSelection} styleName="bold" icon="B" active={style.bold}/> 
        <StyleButton setStyleSelection={setStyleSelection} styleName="italic" icon="I" active={style.italic}/> 
        <StyleButton setStyleSelection={setStyleSelection} styleName="underline" icon="U" active={style.underline}/> 
      </div>
      <ContentEditable text={text.current} ranges={ranges} onSelect={getCurrentStyle} input={input}/>
    </>
  );
}

export default Editor;
