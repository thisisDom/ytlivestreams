import { connect } from 'react-redux'
import { setUser, viewStream } from '../../redux/actions'
import Header from './Header'

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  signOut: () => {
    dispatch(setUser(null));
  },
  viewLiveStreams: () => {
    dispatch(viewStream(null))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
