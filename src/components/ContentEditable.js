import React from 'react';
import classnames from 'classnames';

function ContentEditable ({input, text="", ranges, onSelect}) {

  function renderText (text="", ranges) {
    let chunk = '';
    const res = [];
    let current = ranges[0];
  
    for (let i = 0; i < text.length; i++) {
      chunk += text[i];
      
      if (ranges[i+1] !== current) {
        const span = <span key={i} className={classnames(ranges[i])}>{chunk}</span>;
        res.push(span);
        
        current = ranges[i+1];
        chunk = '';
      }
    }
    chunk && res.push(chunk);
    return res;
  };
  return (
      <div
        contentEditable={true}
        suppressContentEditableWarning={true}
        ref={input}
        className="editor"
        onSelect={onSelect}
        >
        {renderText(text, ranges)}
      </div>
  );
}

export default React.memo(ContentEditable);
