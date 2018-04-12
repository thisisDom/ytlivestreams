import React from 'react';
import YTPlayer from 'react-youtube';
import './LiveStreamPlayer.css';

const LiveStreamPlayer = ({ livestream }) => {
  const { channel_title: channelTitle, title } = livestream.snippet;
  const playerWidth = 800;
  const playerHeight = Math.floor( playerWidth * .61);
  const opts = {
      height: playerHeight || 390,
      width: playerWidth || 640,
      playerVars: {
        autoplay: 1
      }
    };
  return (
    <div className="livestream-player-container">
      <div className="player-wrapper" style={{ height: playerHeight, width: playerWidth}}>
        <YTPlayer
          videoId={livestream.id}
          opts={opts}
          />
      </div>
      <div className="livestream-info">
        <div className="livestream-title">{title}</div>
        <div className="livestream-stats">
          <span className="viewers">{livestream.stats.view_count} {livestream.stats.view_count === 1 ? ' view' : ' views'}</span>
        </div>
        <div className="livestream-channel">{channelTitle}</div>
      </div>
    </div>
  )
};

export default LiveStreamPlayer;
