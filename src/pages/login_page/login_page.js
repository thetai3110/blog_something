import './login_page.css';

export const LoginPage = () => {
    return (
        <div className="login_page">
            <div className="login-wrap">
                <div className="login-content">
                    <input id="tab-1" type="radio" name="tab" className="sign-in" checked></input><label htmlFor="tab-1" className="tab">Sign In</label>
                    <input id="tab-2" type="radio" name="tab" className="sign-up"></input><label htmlFor="tab-2" className="tab">Sign Up</label>
                    <div className="login-form">
                        <div className="sign-in-tab">
                            <div className="group">
                                <label htmlFor="user" className="label">Username</label>
                                <input id="user" type="text" className="input"></input>
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">Password</label>
                                <input id="pass" type="password" className="input" data-type="password"></input>
                            </div>
                            <div className="group">
                                <input type="checkbox" className="check"></input>
                                <label htmlFor="check"> Keep me signed in</label>
                            </div>
                            <div className="group">
                                <input type="submit" className="button" value="Sign In"></input>
                            </div>
                            <div className="hr"></div>
                            <div className="foot-link">
                                <a href="#forgot">Forgot Password?</a>
                            </div>
                        </div>
                        <div className="sign-up-tab">
                            <div className="group">
                                <label htmlFor="user" className="label">Username</label>
                                <input id="user" type="text" className="input"></input>
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">Password</label>
                                <input id="pass" type="password" className="input" data-type="password"></input>
                            </div>
                            <div className="group">
                                <label htmlFor="pass" className="label">Repeat Password</label>
                                <input id="pass" type="password" className="input" data-type="password"></input>
                            </div>
                            <div className="group">
                                <label for="pass" className="label">Email Address</label>
                                <input id="pass" type="text" className="input"></input>
                            </div>
                            <div className="group">
                                <input type="submit" className="button" value="Sign Up"></input>
                            </div>
                            <div className="hr"></div>
                            <div className="foot-link">
                                <label htmlFor="tab-1"><a href="#">Already Member?</a></label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}