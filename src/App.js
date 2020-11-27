import './App.css';

const mocksString = 'A string that says something in English so I can tell better if it is breaking or not';

const notOverlaps = {
  20: {bold: 'start'},
  25: {bold: 'end'},
  30: {italic: 'start'},
  35: {italic: 'end'},
}

const sameRange = {
  20: {bold: 'start', italic: 'start'},
  25: {italic: 'end', bold: 'end'},
}

const overlaps = {
  1: {bold: 'start'},
  9: {italic: 'start'},
  10: {bold: 'end'},
  15: {italic: 'end'}
}

function App() {

  return (
    <div className="App">
      <button><span className="bold">B</span></button> 
      <button><span className="italic">I</span></button> 
      <button><span className="underline">U</span></button> 
      <div contentEditable="true" cols="30" rows="10" suppressContentEditableWarning={true}>
        {renderText(mocksString, overlaps)}
      </div>
    </div>
  );
}

function addRanges (ranges, s, e, style) {
  if (ranges[s] )  {} // handle when there's something already
  if (ranges[e] || ranges[s])  {} // handle when there's something already
  
  const indexes = Object.keys(ranges).sort((a, b) => a - b);
  
  for (let i of indexes) {
    if (ranges[i] && ranges[i][style]) {
      // edge case we have another s or e inside the new range 
      if (i > s || i < e) delete ranges[i][style];
      // edge case if new range is included inside a range
    }
  }

  ranges[s] = {[style]:'start'};
  ranges[e] = {[style]:'end'};
}


function renderText (text, ranges) {
  const res = [];
  let firstIndex = 0;
  const open = {};
  const indexes = Object.keys(ranges).sort((a, b) => a - b);

  for (let i of indexes) {
    if (i > text.length) break;
    let chunk = text.substring(firstIndex, i);

    const styles = Object.keys(open).filter((key) => open[key])
    const span = <span key={i} className={styles.join(' ')}>{chunk}</span>
    res.push(span);

    Object.keys(ranges[i]).forEach(key => {
      if (ranges[i][key] === 'start') open[key] = true;
      if (ranges[i][key] === 'end') open[key] = false;
    })
    firstIndex = i;
  }
  res.push(text.substring(firstIndex));
  return res;
}




export default App;
