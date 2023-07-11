import './App.css';
import axios from 'axios';
import { useState } from 'react';

const API_URL = 'http://localhost:5000/summarize';

function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const getSummary = () => {
    setLoading(true);
    axios.post(API_URL, { text })
      .then(response => {
        setResult(response.data);
      })
      .catch(error => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      })
  }

  const resetSummary = () => {
    setText('');
    setResult('');
  }

  const copyText = () => {
    navigator.clipboard.writeText(result);
  }

  return (
    <div className='App'>
      <h1>Text Summary</h1>
      <textarea
        className='textarea'
        placeholder='Write or paste some text you want to summarize'
        onChange={(e) => setText(e.target.value)}
        autoFocus
        value={text}
        rows={20} />
      <button
        className='submit-button'
        onClick={getSummary}>
        Submit
      </button>
      <button
        className='reset-button'
        onClick={resetSummary}>
        Reset
      </button>
      <div className='summary-container'>
        <div className='summary-header'>
          <h2>[ Summary ]</h2>
          {result && <button
            className='copy-button'
            onClick={copyText}>
            Copy
          </button>}
        </div>
        <p>{loading ? 'Summarizing now. Please wait a moment...' : result}</p>
      </div>
    </div>
  );
}

export default App;
