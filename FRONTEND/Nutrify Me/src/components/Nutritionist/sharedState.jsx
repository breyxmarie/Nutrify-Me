import { useState, useEffect } from 'react';

export function useSharedState() {
  const [state, setState] = useState(null);

  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.data && event.source === window.opener) {
        setState(event.data);
      }
    });

    return () => {
      window.removeEventListener('message', (event) => {
        if (event.data && event.source === window.opener) {
          setState(event.data);
        }
      });
    };
  }, []);

  return [state, setState];
}