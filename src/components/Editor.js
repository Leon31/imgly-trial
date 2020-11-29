import { useRef, useState } from 'react';
import sanitizeHtml from "sanitize-html";

import StyleButton from "./StyleButton";
import ContentEditable from "./ContentEditable";


function Editor() {
  const text = useRef(window.localStorage.getItem('text'));
  const [styles, setStyles] = useState({})

  function editText ({ target }) {
    text.current = target.value;
    updateStorage();
  }

  function setStyleSelection (style) {
    document.execCommand(style);
    setStyles(styles => ({...styles, [style]:true}))
    updateStorage();
  }

  function updateStorage() {
    window.localStorage.setItem('text', text.current)
  }

  function sanitize () {
    text.current = sanitizeHtml(text.current, { allowedTags: ["b", "i", "u"] });
  };

  function showCurrent () {
    const currentStyles = {
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
    }
    if (
      currentStyles.bold !== styles.bold &&
      currentStyles.bold !== styles.bold &&
      currentStyles.bold !== styles.bold ) {
        setStyles(currentStyles);
    }
  }

  return (
    <>
      <div className="buttons">
        <StyleButton setStyleSelection={setStyleSelection} styleName="bold" icon="B" active={styles.bold}/> 
        <StyleButton setStyleSelection={setStyleSelection} styleName="italic" icon="I" active={styles.italic}/> 
        <StyleButton setStyleSelection={setStyleSelection} styleName="underline" icon="U" active={styles.underline}/> 
      </div>
      <ContentEditable text={text.current} editText={editText} sanitize={sanitize} showCurrent={showCurrent}/>
    </>
  );
}

export default Editor;
