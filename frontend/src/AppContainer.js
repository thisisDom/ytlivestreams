import { connect } from 'react-redux';
import App from './App';

const mapStateToProps = (state) => ({
  user: state.user,
  livestream: state.livestream
})

export default connect(mapStateToProps)(App);
