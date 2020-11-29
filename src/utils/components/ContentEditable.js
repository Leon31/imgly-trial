import React from 'react';
import classnames from 'classnames';
import Editable from 'react-contenteditable'

function ContentEditable ({input, text, ranges, replaceRange, selection}) {

  const renderText = (text, ranges) => {
    let chunk = '';
    const res = [];
    let current = ranges[0];
  
    for (let i = 0; i < text.length; i++) {
      chunk += text[i];
      
      if (ranges[i+1] !== current) {
        const span = `<span key="${i}" class="${classnames(ranges[i])}">${chunk}</span>`
        res.push(span);
        
        current = ranges[i+1];
        chunk = '';
      }
    }
    chunk && res.push(chunk);
    return res;
  };
  
  return (
      <Editable
        innerRef={input}
        className="editor" 
        html={renderText(text, ranges).join('')}
        onChange={replaceRange}
        onSelect={selection}
      /> 
  );
}

export default React.memo(ContentEditable);
