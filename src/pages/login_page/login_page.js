import { Link, useHistory } from 'react-router-dom';
import './login_page.css';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useRef } from 'react';
import { useAuth } from '../../contexts/auth_context';
import { useState } from 'react';

// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    // callbacks: {
    //   // Avoid redirects after sign-in.
    //   signInSuccessWithAuthResult: () => false,
    // },
};

export const LoginPage = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError("")
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/")
        } catch {
            setError("Failed to log in")
        }
    }

    return (
        <div className="login_page">
            <div className="login-wrap">
                <div className="login-content">
                    <h2>sign in</h2>
                    <div className="alert alert-danger" role="alert" style={{ color: 'red', display: error === '' ? 'none' : 'block' }}>
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
                            <div className="login-other">
                                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const SignUpPage = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }
        try {
            setError("")
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/login")
        } catch {
            setError("Failed to create an account")
        }
    }

    return (
        <div className="login_page">
            <div className="login-wrap">
                <div className="login-content">
                    <h2>sign up</h2>
                    <div className="alert alert-danger" role="alert" style={{ color: 'red', display: error === '' ? 'none' : 'block' }}>
                        {error}
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
                            <div className="login-other">
                                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const ForgotPasswordPage = () => {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setMessage("")
            setError("")
            await resetPassword(emailRef.current.value)
            setMessage("Check your inbox for further instructions")
        } catch {
            setError("Failed to reset password")
        }
    }

    return (
        <div className="login_page">
            <div className="login-wrap">
                <div className="login-content">
                    <h2>password reset</h2>
                    <div className="alert alert-danger" role="alert" style={{ color: 'red', display: error === '' ? 'none' : 'block' }}>
                        {error}
                    </div>
                    <div className="alert alert-success" role="alert" style={{ display: message === "" ? 'none' : 'block' }}>
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
                            <div className="login-other">
                                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}



