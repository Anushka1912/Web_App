import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

Modal.setAppElement('#root');

const VideoJS = ({ onAddVideo, onBookmark }) => {
  const [videos, setVideos] = useState([]);
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const playerRef = useRef(null);
  const videoNodeRef = useRef(null);

  useEffect(() => {
    // Load videos from local storage on mount
    const storedVideos = JSON.parse(localStorage.getItem('videos')) || [];
    setVideos(storedVideos);
  }, []);

  useEffect(() => {
    if (selectedVideo && videoNodeRef.current) {
      playerRef.current = videojs(videoNodeRef.current, {}, () => {
        console.log('Player is ready');
      });
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
      }
    };
  }, [selectedVideo]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      const newVideo = { id: Date.now(), title: file.name, url: videoUrl, bookmarked: false };
      const updatedVideos = [...videos, newVideo];
      setVideos(updatedVideos);
      localStorage.setItem('videos', JSON.stringify(updatedVideos));
      onAddVideo(newVideo);
    }
  };

  const handleBookmark = (video) => {
    const updatedVideos = videos.map((v) =>
      v.id === video.id ? { ...v, bookmarked: !v.bookmarked } : v
    );
    setVideos(updatedVideos);
    localStorage.setItem('videos', JSON.stringify(updatedVideos));
    onBookmark(video);
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  const filteredVideos = showBookmarked ? videos.filter((video) => video.bookmarked) : videos;

  return (
    <div>
      <h2>Video List</h2>
      <button onClick={() => setShowBookmarked(!showBookmarked)}>
        {showBookmarked ? 'Show All Videos' : 'Show Bookmarked Videos'}
      </button>
      <ul>
        {filteredVideos.map((video, index) => (
          <li key={index}>
            <div onClick={() => handleVideoClick(video)}>
              {video.title}
            </div>
            <button onClick={() => handleBookmark(video)}>
              {video.bookmarked ? 'Unbookmark' : 'Bookmark'}
            </button>
          </li>
        ))}
      </ul>
      <input type="file" accept="video/*" onChange={handleFileUpload} />
      <Modal isOpen={!!selectedVideo} onRequestClose={closeModal} contentLabel="Video Player">
        {selectedVideo && (
          <div data-vjs-player>
            <video ref={videoNodeRef} className="video-js vjs-big-play-centered" controls>
              <source src={selectedVideo.url} type="video/mp4" />
            </video>
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default VideoJS;
