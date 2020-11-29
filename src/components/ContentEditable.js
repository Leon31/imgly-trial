import React from 'react';
import Editable from 'react-contenteditable'

function ContentEditable ({text, editText, showCurrent, sanitize}) {

  return (
      <Editable
        className="editor" 
        html={text}
        onChange={editText}
        onSelect={showCurrent}
        onBlur={sanitize}
      /> 
  );
}

export default React.memo(ContentEditable);
