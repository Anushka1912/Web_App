// App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoJS from './components/VideoJS';
import UserInfo from './components/UserInfo';


function App() {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pastSearchTerms, setPastSearchTerms] = useState([]);
  const [ setSortedUsers] = useState([]);
  const [bookmarkedVideos, setBookmarkedVideos] = useState([]);
  const [userInfos, setUserInfos] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUserInfos(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleAddVideo = (video) => {
    setVideos([...videos, video]);
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const filteredUsers = userInfos.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setSortedUsers(filteredUsers);
    setPastSearchTerms([...pastSearchTerms, searchTerm]);
  };

  const handleSort = () => {
    const sortedUsers = userInfos.sort((a, b) => a.name.localeCompare(b.name));
    setSortedUsers(sortedUsers);
  };

  const handleBookmark = (video) => {
    setBookmarkedVideos([...bookmarkedVideos, video]);
  };

  return (
    <div>
      <h1>Video Library</h1>
      <VideoJS videos={videos} onAddVideo={handleAddVideo} onBookmark={handleBookmark} />
      <h1>User Info</h1>
      <UserInfo userInfos={userInfos} searchTerm={searchTerm} onSearch={handleSearch} pastSearchTerms={pastSearchTerms} onSort={handleSort} />
    </div>
  );
}

export default App;