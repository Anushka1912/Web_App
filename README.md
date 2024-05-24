# VideoJS and UserInfo Components

## Overview

This project consists of two main components: `VideoJS` and `UserInfo`. 

- `VideoJS`: Allows users to upload videos, play them in a popup modal, bookmark videos, and filter to view only bookmarked videos. All data is persisted using local storage.
- `UserInfo`: Fetches user information from an external API, displays it, allows searching by name, keeps track of past search terms, and enables sorting by name. Past search terms are also persisted using local storage.

## Technologies Used

- React
- Axios (for API calls)
- Video.js (for video playback)
- React Modal (for popup modals)
- Local Storage (for data persistence)

## VideoJS Component

### Features

- Upload videos from your system.
- Display a list of all uploaded videos.
- Play individual videos in a popup modal.
- Bookmark videos.
- Filter to view only bookmarked videos.
- Persist all data using local storage.

### Usage

1. **Upload a Video**
   - Use the file input to select and upload a video from your system.
   - The video will be added to the list and can be played in a popup modal.

2. **Bookmark a Video**
   - Click the "Bookmark" button next to any video to bookmark it.
   - Toggle the button text between "Bookmark" and "Unbookmark".

3. **Filter Videos**
   - Use the "Show Bookmarked Videos" button to filter the list to only show bookmarked videos.
   - Toggle the button text between "Show All Videos" and "Show Bookmarked Videos".

