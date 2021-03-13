import { useRef } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/auth_context"
import { auth } from "../../firebase"
import { setError, setMessage } from "../../redux/login/login.actions"
import OthersLogin from "./components/others-login.component"
import './login_page.css';

const SignUpPage = ({ error, message, setError, setMessage }) => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    async function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }
        try {
            setError("")
            setMessage("")
            await signup(emailRef.current.value, passwordRef.current.value)
            await auth.currentUser.sendEmailVerification({
                url: `${process.env.REACT_APP_CLIENT}/`,
            });
            setMessage("Success, please check email and verify email that you just register!")
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <div className="login_page">
            <div className="login-wrap">
                <div className="login-content">
                    <h2>sign up</h2>
                    <div className="alert alert-danger" role="alert" style={{ color: 'red', fontSize: '13px', display: error === '' ? 'none' : 'block' }}>
                        {error}
                    </div>
                    <div className="alert alert-success" role="alert" style={{ fontSize: '13px', display: message === "" ? 'none' : 'block' }}>
                        {message}
                    </div>
                    <div className="login-form">
                        <form className="sign-up" onSubmit={handleSubmit}>
                            <div className="group">
                                <label htmlFor="pass" className="label">Email Address</label>
                                <input id="pass-signup" type="text" className="input" ref={emailRef}></input>
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">Password</label>
                                <input id="pass-signup" type="password" ref={passwordRef} className="input" data-type="password"></input>
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">Repeat Password</label>
                                <input id="pass-repeat-signup" type="password" ref={passwordConfirmRef} className="input" data-type="password"></input>
                            </div>

                            <div className="group">
                                <input type="submit" className="button" value="Sign Up"></input>
                            </div>
                            <div className="link-redirect">
                                <Link to="/login">Already Member?</Link>
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
    message: login.message
})

const mapDispatchToProps = dispatch => ({
    setError: err => dispatch(setError(err)),
    setMessage: message => dispatch(setMessage(message)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage);