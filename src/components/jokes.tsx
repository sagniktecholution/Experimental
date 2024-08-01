import React, { useState, useEffect } from 'react';
import axios from 'axios';
export const JokeFetcher = () => {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://official-joke-api.appspot.com/
        random_joke`);
      setJoke(`${response.data.setup} - ${response.data.punchline}`);
    } catch (err) {
      setError('Failed to fetch joke.');
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchJoke();
  }, []);
  return (
    <div>
      <h1>Random Joke</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && <p>{joke}</p>}
      <button onClick={fetchJoke}>Fetch Another Joke</button>
    </div>
  );
};
