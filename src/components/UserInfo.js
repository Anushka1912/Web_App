import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserInfo = () => {
  const [userInfos, setUserInfos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [pastSearchTerms, setPastSearchTerms] = useState([]);
  const [sorted, setSorted] = useState(false);

  useEffect(() => {
    // Fetch user data from API
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUserInfos(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });

    // Load past search terms from local storage
    const storedSearchTerms = JSON.parse(localStorage.getItem('pastSearchTerms')) || [];
    setPastSearchTerms(storedSearchTerms);
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);

    // Update past search terms and save to local storage
    if (term && !pastSearchTerms.includes(term)) {
      const updatedSearchTerms = [...pastSearchTerms, term];
      setPastSearchTerms(updatedSearchTerms);
      localStorage.setItem('pastSearchTerms', JSON.stringify(updatedSearchTerms));
    }
  };

  const handleSort = () => {
    const sortedUserInfos = [...userInfos].sort((a, b) => a.name.localeCompare(b.name));
    setUserInfos(sortedUserInfos);
    setSorted(true);
  };

  const filteredUsers = userInfos.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <h2>User List</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search by name"
      />
      <ul>
        {filteredUsers.map((user, index) => (
          <li key={index}>{user.name}</li>
        ))}
      </ul>
      <h2>Past Search Terms</h2>
      <ul>
        {pastSearchTerms.map((term, index) => (
          <li key={index}>{term}</li>
        ))}
      </ul>
      <button onClick={handleSort}>
        {sorted ? 'Sorted by Name' : 'Sort by Name'}
      </button>
    </div>
  );
};

export default UserInfo;
