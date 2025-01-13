import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const signupMutation = useSignup();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signupMutation.mutate({ username, password, nickname }, {
      onSuccess: () => {
        navigate('/profile');
      },
    });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nickname:</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={signupMutation.isPending}>
          {signupMutation.isPending ? 'Signing up...' : 'Signup'}
        </button>
      </form>
      {signupMutation.isError && (
        <p style={{ color: 'red' }}>Signup failed. Username might already be taken.</p>
      )}
    </div>
  );
};

export default Signup;
