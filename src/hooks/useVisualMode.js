import { useState } from 'react';

// segregated view control for switching Component views
export default function useVisualMode(initial) {
  // set states
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // transition forward to new view, optionally replace history to skip backing into loading views
  function transition(newMode, replace = false) {
    setMode(newMode);

    // if replacing, clone new history array without the last element and add the new mode
    if (replace) {
      setHistory(prev => [...prev.slice(0, -1), newMode]);
    
    // otherwise, add new mode to end of history array
    } else {
      setHistory(prev => [...prev, newMode]);
    }
  }

  // go back to preview view
  function back() {
    // prevent backing if no history
    if (history.length > 1) {
      // set view to second last element of history array
      const newHistory = history.slice(0, -1);
      setMode(history[newHistory.length - 1]);
  
      // clone history array without the last element
      setHistory(prev => [...prev.slice(0, -1)]);
    }
  }
  
  return {
    mode,
    transition,
    back,
  };
}