import { useEffect } from 'react';
import './App.css';

const mocksString = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus nam reprehenderit repellat provident fugit? Modi est eaque rerum commodi perspiciatis, neque accusamus cupiditate incidunt debitis, quam esse aliquam veniam dolorem!Est dolore repellat voluptatum minus. Doloribus quo sunt nihil ipsa quaerat. Consectetur saepe asperiores porro atque ex nostrum facilis nihil cumque. Dolorem velit, nostrum voluptates aperiam dolor veritatis consectetur culpa?';

function App() {
  return (
    <div className="App">
      <textarea name="editor" cols="30" rows="10">{mocksString}</textarea>
    </div>
  );
}

export default App;
