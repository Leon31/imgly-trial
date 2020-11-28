

export function getCaretPosition(element) {
  const range = window.getSelection().getRangeAt(0);
  const preCaretRange = range.cloneRange();
  preCaretRange.selectNodeContents(element);
  preCaretRange.setEnd(range.endContainer, range.endOffset);
  return preCaretRange.toString().length;
}

export function getCaretHTMLBegin(element) {
  const range = window.getSelection().getRangeAt(0);
  const preCaretRange = range.cloneRange();
  preCaretRange.selectNodeContents(element);
  preCaretRange.setEnd(range.endContainer, range.startOffset);
  return preCaretRange.toString().length;
}

export function getSelectionEnd (element) {
  const range = window.getSelection().getRangeAt(0);
  const preCaretRange = range.cloneRange();
  preCaretRange.selectNodeContents(element);
  preCaretRange.setEnd(range.endContainer, range.endOffset);
  return preCaretRange.toString().length;
}

export function getSelectionStart (element) {
  const range = window.getSelection().getRangeAt(0);
  const preCaretRange = range.cloneRange();
  preCaretRange.selectNodeContents(element);
  preCaretRange.setEnd(range.commonAncestorContainer, range.startOffset);
  return preCaretRange.toString().length;
}