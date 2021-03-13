import React, { useContext, useEffect } from "react"
import { auth } from "../firebase"
import firebase from 'firebase';
import { connect } from "react-redux";
import { setCurrentUSer } from "../redux/user/user.actions";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

const AuthProvider = ({ children, currentUser, setCurrentUser }) => {
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    function loginWithGoogle() {
        var provider = new firebase.auth.GoogleAuthProvider();
        return auth.signInWithPopup(provider)
    }

    function loginWithFacebook() {
        var provider = new firebase.auth.FacebookAuthProvider();
        return auth.signInWithPopup(provider)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        loginWithGoogle,
        loginWithFacebook
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

const mapStateToProps = ({ user }) => ({
    currentUser: user.currentUser,
})

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUSer(user)),
})
export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider);

