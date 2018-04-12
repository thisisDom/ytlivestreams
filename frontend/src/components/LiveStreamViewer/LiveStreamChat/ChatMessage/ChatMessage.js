import React from 'react';
import './ChatMessage.css';

const ChatMessage = ({ info, onClick })  => {
  const username = info.authorDetails.displayName;
  const displayMessage= info.snippet.displayMessage;

  return (
    <div className="chat-line">
      <span className="chat-username" onClick={() =>  onClick(info.authorDetails)} title={"Click to view chat messages from " + username}>{username}</span> <span className="chat-message">{displayMessage}</span>
    </div>
  )
}

export default ChatMessage
