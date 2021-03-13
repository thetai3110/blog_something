import { useRef } from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { useAuth } from "../../contexts/auth_context"
import { setError, setMessage } from "../../redux/login/login.actions"
import OthersLogin from "./components/others-login.component"

const ForgotPasswordPage = ({error, message, setError, setMessage, history}) => {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setMessage("")
            setError("")
            await resetPassword(emailRef.current.value)
            setMessage("Check your inbox for further instructions")
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className="login_page">
            <div className="login-wrap">
                <div className="login-content">
                    <h2>password reset</h2>
                    <div className="alert alert-danger" role="alert" style={{ color: 'red', fontSize: '13px', display: error === '' ? 'none' : 'block' }}>
                        {error}
                    </div>
                    <div className="alert alert-success" role="alert" style={{ fontSize: '13px', display: message === "" ? 'none' : 'block' }}>
                        {message}
                    </div>
                    <div className="login-form">
                        <form className="sign-in" onSubmit={handleSubmit}>
                            <div className="group">
                                <label htmlFor="pass" className="label">Email Address</label>
                                <input id="pass-reset" type="text" className="input" ref={emailRef}></input>
                            </div>
                            <div className="group">
                                <input type="submit" className="button" value="Reset pasword"></input>
                            </div>
                            <div className="link-redirect">
                                <Link to="/login">Sign In?</Link>
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
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage);