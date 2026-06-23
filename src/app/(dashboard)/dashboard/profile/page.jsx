import UserProfile from '@/component/dashboard/UserProfile';
import React from 'react';

const Profile = () => {
    return (
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">My Profile</h1>
            <p className="text-sm text-gray-400 mt-1">Manage your personal information and account settings</p>
          </div>
          <UserProfile />
        </div>
    );
};

export default Profile;