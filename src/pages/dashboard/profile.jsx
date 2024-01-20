import React from 'react';
import { Helmet } from 'react-helmet-async';
import ProfileView from 'src/sections/profile/profile-view';

export default function Profile() {
  return (
    <div>
      <Helmet>
        <title>Profil</title>
      </Helmet>

      <ProfileView />
    </div>
  );
}
