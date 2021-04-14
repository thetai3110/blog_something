import { Link } from 'react-router-dom';
import './login.page.css';
import { useRef } from 'react';
import { useAuth } from '../../contexts/auth_context';
import { connect } from 'react-redux';
import { setError } from '../../redux/login/login.actions';
import OthersLogin from './components/others-login.component';

const LoginPage = ({ history, error, setError }) => {
    console.log(history)
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, logout } = useAuth()
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError("")
            const rs = await login(emailRef.current.value, passwordRef.current.value)
            if (rs.user.emailVerified) {
                history.push('/')
            } else {
                setError('The user not exists. The user may have been deleted.')
                logout()
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className="login_page">
            <div className="login-wrap">
                <div className="login-content">
                    <h2>sign in</h2>
                    <div className="alert alert-danger" role="alert" style={{ color: 'red', fontSize: '13px', display: error === '' ? 'none' : 'block' }}>
                        {error}
                    </div>
                    <div className="login-form">
                        <form className="sign-in" onSubmit={handleSubmit}>
                            <div className="group">
                                <label htmlFor="email" className="label">Email</label>
                                <input id="email-signin" type="text" className="input" ref={emailRef}></input>
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">Password</label>
                                <input id="pass-signin" type="password" className="input" data-type="password" ref={passwordRef}></input>
                            </div>
                            <div className="group">
                                <input type="submit" className="button" value="Sign In"></input>
                            </div>
                            <div className="group forgot">
                                <div className="link-redirect">
                                    <Link to="/signup">Sign Up?</Link>
                                </div>
                                <Link to="/forgot-password" className="forgot-password">Forgot Password?</Link>
                            </div>
                            <div className="hr"></div>
                            <OthersLogin />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = ({ login }) => ({
    error: login.error,
})

const mapDispatchToProps = dispatch => ({
    setError: err => dispatch(setError(err)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);



