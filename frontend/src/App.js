import React, { Component } from 'react';
import Header from './components/Header/HeaderContainer';
import Login from './components/Login/LoginContainer';
import LiveStreamBrowser from './components/LiveStreamBrowser/LiveStreamBrowserContainer';
import LiveStreamViewer from './components/LiveStreamViewer/LiveStreamViewerContainer';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: this.props.user,
      livestream: this.props.livestream
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps === this.props){
      return;
    }
    if(nextProps.user !== this.props.user){
      this.setState({
        user: nextProps.user
      })
    }
    if(nextProps.livestream !== this.props.livestream){
      this.setState({
        livestream: nextProps.livestream
      })
    }
  }
  renderView(){
    if(this.state.user === null){
      return <Login />
    }
    if(this.state.livestream){
      return <LiveStreamViewer />
    }
    return <LiveStreamBrowser />;
  }
  render() {
    return (
      <div className="app-container">
        <Header />
        {this.renderView()}
      </div>
    );
  }
}

export default App;
