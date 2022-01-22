import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode);

    if (replace) {
      const newHistory = history.slice(0, history.length - 1);
      setHistory([...newHistory, newMode]);
    } else {
      setHistory([...history, newMode]);
    }
  }

  function back() {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
  
      setMode(history[newHistory.length - 1]);
      setHistory(newHistory);
    }
  }
  
  return {
    mode,
    transition,
    back,
  };
}