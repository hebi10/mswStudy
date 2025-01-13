import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/user/userSlice';

interface UserData {
  id: string;
  nickname: string;
  image: string;
  isLoggedIn: boolean;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ username, password }, {
      onSuccess: (user: UserData) => {
        dispatch(login({
          id: user.id,
          nickname: user.nickname,
          image: user.image,
        }));
        navigate('/profile');
      },
      onError: (error: Error) => {
        console.error('로그인 실패:', error.message);
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
      },
    });
  };
  

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Login</h1>
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
        <button type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {loginMutation.isError && (
        <p style={{ color: 'red' }}>Login failed. Please check your credentials.</p>
      )}
      <dl>
        <dt>elonmusk</dt>
        <dd>1234</dd>
      </dl>
    </div>
  );
};

export default Login;
