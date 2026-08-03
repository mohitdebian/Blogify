import React, { useState, useEffect } from 'react';

export function UserProfile({ userId }) {
  const [profile, setProfile] = useState(null);
  
  // React Hook useEffect has a missing dependency: 'userId'.
  useEffect(() => {
    fetch(`/api/users/${userId}/profile`)
      .then(res => res.json())
      .then(data => setProfile(data));
  }, []); // Intentional missing dependency for linting violation

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-card">
      <h2>User Profile</h2>
      {/* VULNERABILITY: Cross-Site Scripting (XSS) via dangerouslySetInnerHTML */}
      <div 
        className="bio" 
        dangerouslySetInnerHTML={{ __html: profile.bio }} 
      />
      
      <div className="details">
        {/* Anti-pattern: Binding inline arrow function in render causes unnecessary re-renders */}
        <button onClick={() => console.log('Edit clicked for', userId)}>
          Edit Profile
        </button>
      </div>
    </div>
  );
}
