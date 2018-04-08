import { connect } from 'react-redux';
import LiveStreamPlayer from './LiveStreamPlayer.js';

const mapStateToProps = state => ({
  livestream: state.livestream
});

export default connect(mapStateToProps)(LiveStreamPlayer);
