import React from 'react';
import './LiveStreamThumbnail.css';

const LiveStreamThumbnail = (props) => {
  const { channel_title, title, thumbnails: { high: { url: imgUrl } } } = props.stream.snippet
  return (
    <div className="livestream-thumbnail" >
      <img className="livestream-thumbnail-img" src={imgUrl}  onClick={() => { props.onClick(props.stream)}}/>
      <div className="livestream-thumbnail-title" title={title} onClick={() => { props.onClick(props.stream)}}>{title}</div>
      <div className="livestream-thumbnail-channel">{channel_title}</div>
    </div>
  );
}

export default LiveStreamThumbnail;
