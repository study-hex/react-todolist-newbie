import { useState } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  margin: 0 1rem;
  padding: 0.25rem 1rem;

  border: 2px solid #bf4f74;
  border-radius: 3px;
  color: #bf4f74;
  background: transparent;
`;

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Vite + React</h1>

      <Button>Normal Button</Button>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
