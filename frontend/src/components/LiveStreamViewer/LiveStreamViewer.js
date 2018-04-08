import React, { Component } from 'react';
import LiveStreamPlayer from './LiveStreamPlayer/LiveStreamPlayerContainer';
import LiveStreamChat from './LiveStreamChat/LiveStreamChatContainer.js';
import './LiveStreamViewer.css'

const LiveStreamViewer = ({livestream, viewLiveStreams}) => {
    const chat = livestream.liveStreamingDetails.active_live_chat_id ? <LiveStreamChat /> : <div className="disabled-chat">Livestream's chat is disabled</div>
    return (
      <div className="livestream-viewer-container">
        <div className="livestream-viewer-header"><a href="#" onClick={() => viewLiveStreams()}>Back to Live Streams</a></div>
        <LiveStreamPlayer />
        {chat}
      </div>
    )
}

export default LiveStreamViewer
