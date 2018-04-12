import { connect } from 'react-redux';
import { viewStream } from '../../redux/actions'
import LiveStreamViewer from './LiveStreamViewer'

const mapStateToProps = state => ({
  livestream: state.livestream
})

const mapDispatchToProps = dispatch => ({
  viewLiveStreams: () => {
    dispatch(viewStream(null))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LiveStreamViewer)
