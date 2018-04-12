import React, { Component } from 'react'
import axios from 'axios'
import LiveStreamThumbnail from '../LiveStreamThumbnail/LiveStreamThumbnail.js'
import './LiveStreamBrowser.css'

class LiveStreamBrowser extends Component{
  constructor(props){
    super(props);
    this.maxResults = 20;
    this.state = {
      prevPage: null,
      nextPage: null,
      liveStreams: []
    }
  }

  componentWillMount(){
    this.getLiveStreams();
  }

  getLiveStreams(pageToken = ''){
    const access_token = this.getToken();
    axios({
      url: '/livestreams',
      method: 'GET',
      params: {
        tk: access_token,
        pageToken: pageToken,
        maxResults: this.maxResults
      },
      responseType: "json"
    })
    .then(response => {
      let nextPage = null, prevPage = null;
      if ( response.data.streams.next_page_token &&  response.data.streams.items.length === this.maxResults ){
        nextPage = response.data.streams.next_page_token
      }
      if ( response.data.streams.next_page_token ){
        prevPage = response.data.streams.prev_page_token
      }
      this.setState({
        liveStreams: response.data.streams.items,
        nextPage: nextPage,
        prevPage: prevPage
      })
    })
  }

  getToken(){
    let timeNow = Date.now();
    let { expires_in, access_token } = this.props.user.getAuthResponse();
    if (expires_in - timeNow < 1000){
     this.props.user.reloadAuthResponse().then(response => {
       access_token = response.access_token
     })
    }
    return access_token;
  }

  viewStream(streamInfo){
    const access_token = this.getToken();
    axios({
      url: '/livestreams/' + streamInfo.id.video_id,
      method: 'GET',
      params: {
        tk: access_token,
        livestream: streamInfo.id.video_id
      },
      responseType: "json"
    })
    .then(response => {
      const liveStreamingDetails = response.data.stream.items[0].live_streaming_details;
      const stats = response.data.stream.items[0].statistics;
      const stream = {
        id: streamInfo.id.video_id,
        snippet: streamInfo.snippet,
        liveStreamingDetails: liveStreamingDetails,
        stats: stats
      };
      this.props.viewStream(stream)
    })
  }

  renderStreams(){
    if (this.state.liveStreams.length === 0){
      if ( this.state.prevPage ){
        return (<h2>No More LiveStreams Available</h2>);
      }
      return (<h2>Loading...</h2>);
    }
    return this.state.liveStreams.map((stream, index) => {
      return (
        <LiveStreamThumbnail
          key={index}
          stream={stream}
          onClick={(id) => { this.viewStream(id)}}
        />
      )
    })
  }

  render(){
    return (
      <div className="livestreams-browser-container">
        <h4>Streams sorted by popularity</h4>
        <div className="livestream-thumbnails-container">
          {this.renderStreams()}
        </div>
        <div className="livestreams-footer">
          <div className="footer-left">
          { this.state.prevPage && <button onClick={() => this.getLiveStreams(this.state.prevPage)}>Prev</button> }
          </div>
          <div className="footer-right">
          { this.state.nextPage && <button onClick={() => this.getLiveStreams(this.state.nextPage)}>Next</button> }
          </div>
        </div>
      </div>
    )
  }
}

export default LiveStreamBrowser
