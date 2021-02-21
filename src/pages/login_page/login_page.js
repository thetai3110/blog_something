import { Link, useHistory } from 'react-router-dom';
import './login_page.css';
import { useRef } from 'react';
import { useAuth } from '../../contexts/auth_context';
import { useState } from 'react';
import { auth } from '../../firebase';

export const LoginPage = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, logout, loginWithGoogle, loginWithFacebook } = useAuth()
    const [error, setError] = useState("")
    const history = useHistory()
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
                            <div className="login-other">
                                <ul>
                                    <li className="fb"><button onClick={handleLoginFacebook}><i className="fa fa-facebook-square"></i></button></li>
                                    <li className="gl"><button onClick={handleLoginGoogle}><i className="fa fa-google"></i></button></li>
                                </ul>
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
    const { signup, loginWithGoogle, loginWithFacebook } = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const history = useHistory();
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
                url: 'http://localhost:3000/',
            });
            // setTimeout(() => {
            //     if (!rs.user.emailVerified)
            //         rs.user.delete();
            // }, 10000);
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
                            <div className="login-other">
                                <ul>
                                    <li className="fb"><button onClick={handleLoginFacebook}><i className="fa fa-facebook-square"></i></button></li>
                                    <li className="gl"><button onClick={handleLoginGoogle}><i className="fa fa-google"></i></button></li>
                                </ul>
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
    const { resetPassword, loginWithFacebook, loginWithGoogle } = useAuth()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const history = useHistory();
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
                            <div className="login-other">
                                <ul>
                                    <li className="fb"><button onClick={handleLoginFacebook}><i className="fa fa-facebook-square"></i></button></li>
                                    <li className="gl"><button onClick={handleLoginGoogle}><i className="fa fa-google"></i></button></li>
                                </ul>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}



