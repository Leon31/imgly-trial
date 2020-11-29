

export function getCaretPosition(element) {
  try {
    const range = window.getSelection().getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    return preCaretRange.toString().length;
  } catch (error) {
    console.error('Caret position',error)
  }
}

export function getSelectionEnd (element) {
  try {
    const range = window.getSelection().getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    return preCaretRange.toString().length;
  } catch (error) {
    console.error('End selection',error)
  }
}

export function getSelectionStart (element) {
  try {
    const range = window.getSelection().getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.commonAncestorContainer, range.startOffset);
    return preCaretRange.toString().length;
  } catch (error) {
    console.error('Start selection',error)
  }
}