import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

const Profile: React.FC = () => {
  const { id, nickname, image, isLoggedIn } = useSelector((state: RootState) => state.user);

  if (!isLoggedIn) {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Profile</h1>
        <p>You are not logged in.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Profile</h1>
      <p><strong>ID:</strong> {id}</p>
      <p><strong>Nickname:</strong> {nickname}</p>
      {image && <img src={image} alt={`${nickname}'s avatar`} width={200} />}
    </div>
  );
};

export default Profile;
