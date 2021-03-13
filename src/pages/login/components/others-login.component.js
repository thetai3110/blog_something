import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { useAuth } from '../../../contexts/auth_context';
import { setError } from '../../../redux/login/login.actions';
import './other-login.component.css';

const OthersLogin = ({ setError, history }) => {
    const { loginWithFacebook, loginWithGoogle } = useAuth();
    async function handleLoginFacebook(e) {
        e.preventDefault()
        try {
            setError("")
            await loginWithFacebook()
            history.push('/')
        } catch (error) {
            setError(error.message)
        }
    }
    async function handleLoginGoogle(e) {
        e.preventDefault()
        try {
            setError("")
            await loginWithGoogle()
            history.push('/')
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className="login-other">
            <ul>
                <li className="fb"><button onClick={handleLoginFacebook}><i className="fa fa-facebook-square"></i></button></li>
                <li className="gl"><button onClick={handleLoginGoogle}><i className="fa fa-google"></i></button></li>
            </ul>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setError: err => dispatch(setError(err)),
})

export default withRouter(connect(null, mapDispatchToProps)(OthersLogin));