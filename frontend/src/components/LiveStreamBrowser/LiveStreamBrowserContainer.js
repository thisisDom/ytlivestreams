import { connect } from 'react-redux';
import { viewStream } from '../../redux/actions'
import LiveStreamBrowser from './LiveStreamBrowser.js'

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  viewStream: (streamId) => {
    dispatch(viewStream(streamId))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LiveStreamBrowser)
