import { connect } from 'react-redux'
import { setUser } from '../../redux/actions'
import Login from './Login'

const mapStateToProps = (state, ownProps) => ownProps;

const mapDispatchToProps = dispatch => ({
  setUser: (user) => {
    dispatch(setUser(user));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
