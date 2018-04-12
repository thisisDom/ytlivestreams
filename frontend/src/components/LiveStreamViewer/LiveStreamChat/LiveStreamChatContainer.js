import { connect } from 'react-redux';
import LiveStreamChat from './LiveStreamChat';

const mapStateToProps = state => ({
  username: state.user.getBasicProfile().ig,
  user: state.user,
  liveChatId: state.livestream.liveStreamingDetails.active_live_chat_id || null
})

export default connect(mapStateToProps)(LiveStreamChat);
