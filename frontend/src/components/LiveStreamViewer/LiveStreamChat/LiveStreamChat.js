import React, { Component } from 'react'
import axios from 'axios'
import ChatMessage from './ChatMessage/ChatMessage';
import './LiveStreamChat.css'

export default class LiveStreamChat extends Component{
  constructor(props){
    super(props);
    this.defaultMessengerText = 'Say something in chat...';
    this.state = {
      filterAuthor: null,
      nextPageToken: '',
      messages: [],
      messageComponents: [],
      itemIds: new Set(),
      interId: '',
      messengerText: '',
      messageInProgress: false
    }
    this.componentWillMount = this.componentWillMount.bind(this)
    this.getChatMessages = this.getChatMessages.bind(this)
    this.applyChatFilter = this.applyChatFilter.bind(this)
    this.onMessengerChange = this.onMessengerChange.bind(this)
    this.onMessengerKeyPress = this.onMessengerKeyPress.bind(this)
  }

  componentWillMount(){
    const access_token = this.getAccessToken();
    if (this.props.liveChatId){
      axios({
        url: 'https://www.googleapis.com/youtube/v3/liveChat/messages',
        method: "GET",
        params: {
          part: 'id',
           liveChatId: this.props.liveChatId,
           maxResults: 200,
           fields: "nextPageToken"
        },
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      }).then(response => {
        const nextPageToken = response.data.nextPageToken;
        this.setState({
          nextPageToken: nextPageToken
        })
      })
      .then(() => {
        let interId = setInterval(this.getChatMessages, 500);
        this.setState({
          interId: interId
        })
      })
    }
  }
  componentDidUpdate(){
    let chat = document.getElementById('livestream-chat-window');
    const height = chat.scrollHeight;
    chat.scrollTop = height;
  }
  componentWillUnmount(){
    clearInterval(this.state.interId);
  }

  getChatMessages(){
    const access_token = this.getAccessToken();
    axios({
      url: 'https://www.googleapis.com/youtube/v3/liveChat/messages',
      method: "GET",
      params: {
         liveChatId: this.props.liveChatId,
         part: "snippet, authorDetails",
         profileImageSize: 100,
         maxResults: 200,
         pageToken: this.state.nextPageToken,
         fields: "items(id, authorDetails,snippet(displayMessage,publishedAt)),nextPageToken"
      },
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
    .then(response => {
      const nextPageToken = response.data.nextPageToken;
      const items = response.data.items
      let array_size = this.state.messages.length

      let messages = items.filter(item => {
        if (!this.state.itemIds.has(item.id)){
          this.state.itemIds.add(item.id)
          return true
        }
        return false
      })
      let messageComponents = messages.map((item, index) => {
        let newIndex = array_size + index;
        return <ChatMessage info={item} key={newIndex} onClick={this.applyChatFilter} />;
      });
      this.setState({
        nextPageToken: nextPageToken,
        messages: [...this.state.messages, ...messages],
        messageComponents: [...this.state.messageComponents, ...messageComponents]
      });
    })
    .catch(error => {

    })
  }

  applyChatFilter(author){
    this.setState({
      filterAuthor: author,
    })
  }

  clearChatFilter(){
    this.setState({
      filterAuthor: null
    })
  }

  getAccessToken(){
    let timeNow = Date.now();
    let { expires_in, access_token } = this.props.user.getAuthResponse();
    if (expires_in - timeNow < 1000){
     this.props.user.reloadAuthResponse().then(response => {
       access_token = response.access_token
     })
    }
    return access_token;
  }


  onMessengerChange(e){
    let messageText = e.target.value;
    this.setState({
      messengerText: messageText
    })
  }

  messengerSend(){
    if (!this.state.messengerText){
      return;
    }
    const access_token = this.getAccessToken();
    axios({
      url: 'https://www.googleapis.com/youtube/v3/liveChat/messages',
      method: "POST",
      params: {
           part: 'snippet',
      },
      data: {
         snippet: {
           liveChatId: this.props.liveChatId,
           type: 'textMessageEvent',
           textMessageDetails: {
             messageText: this.state.messengerText
           }
         }
      },
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
    .then(response => {
      console.log('chat sent')
    })
    .catch(error => {
      console.log(error)
    })
    this.setState({
      messengerText: '',
    })
  }

  onMessengerKeyPress(e){
    let key = e.which || e.keyCode
    if (key === 13){
      this.messengerSend();
      e.preventDefault();
    }
  }

  renderFilterHeader(){
    if (this.state.filterAuthor){
      return ( <div className="chat-filter-header">
                      <div>Viewing chat messages from {this.state.filterAuthor.displayName}</div>
                      <button onClick={() => this.clearChatFilter()}>return to chat</button>
                  </div> )
    }
    return;
  }

  renderChatMessages(){
    if (this.state.filterAuthor){
      return this.state.messageComponents.filter( component => {
        return component.props.info.authorDetails.channelId === this.state.filterAuthor.channelId
      })
    }
    return this.state.messageComponents
  }

  render(){
    return(
      <div className='livestream-chat-container'>
        <div className="livestream-chat-header">Live Chat</div>
        {this.renderFilterHeader()}
        <div id="livestream-chat-window">
          {this.renderChatMessages()}
        </div>
        <div className="livestream-chat-messenger">
            <div className="username">{this.props.username}</div>
            <textarea
              className='text-window'
              onChange={this.onMessengerChange}
              onKeyPress={this.onMessengerKeyPress}
              placeholder={this.defaultMessengerText}
              value={this.state.messengerText}
              />
            <div className="footer">
              <button onClick={() => this.messengerSend()}>Send</button>
            </div>
        </div>
      </div>
    )
  }
}
