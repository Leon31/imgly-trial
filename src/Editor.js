import classnames from 'classnames';
import { useState, useRef } from 'react';
import { getSelectionEnd, getSelectionStart, getCaretPosition } from "./caret";

const mocksString = 'A string that says something in English so I can tell better if it is breaking or not';

const notOverlaps = {
  20: {bold: true},
  25: {bold: false},
  30: {italic: true},
  35: {italic: false},
}

const sameRange = {
  20: {bold: true, italic: true},
  25: {italic: false, bold: false},
}

const overlaps = {

}

function Editor() {
  const [text, setText] = useState(mocksString);
  const [ranges, setRanges] = useState(overlaps);
  const input = useRef();

  function selection (style) {
    const start = getSelectionStart(input.current)
    const end = getSelectionEnd(input.current);

    setRanges(ranges => ({...addRanges(ranges, start, end, style)}))
  } 


  return (
    <>
      <div className="buttons">
        <button onClick={()=>selection("bold")} ><span className="bold">B</span></button> 
        <button onClick={()=>selection("italic")}><span className="italic">I</span></button> 
        <button onClick={()=>selection("underline")}><span className="underline">U</span></button> 
      </div>
      <div ref={input} className="editor" contentEditable="true" cols="30" rows="10" suppressContentEditableWarning={true}>
        {renderText(text, ranges)}
      </div>
    </>
  );
}

function addRanges (ranges, s, e, style) {
  ranges[s] = {...ranges[s], [style]:true};
  ranges[e] = {...ranges[e], [style]:false};
  return ranges;
}


function renderText (text, ranges) {
  let chunk = '';
  const res = [];
  const open = {};
  if (ranges[0]) Object.assign(open, ranges[0]);
  for (let i = 0; i < text.length; i++) {
    chunk += text[i];
    if (ranges[i+1]) {
      const span = <span key={i} className={classnames(open)}>{chunk}</span>
      res.push(span);

      Object.assign(open, ranges[i+1]);
      chunk = '';
    }
  }
  res.push(chunk);
  return res;
}

export default Editor;
