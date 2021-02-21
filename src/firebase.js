import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyBSMSeC7qR__N-4-muaSwdjOWcdN6OHuoI",
    authDomain: "blog-something.firebaseapp.com",
    projectId: "blog-something",
    storageBucket: "blog-something.appspot.com",
    messagingSenderId: "1066736163126",
    appId: "1:1066736163126:web:2669391ed5ec49e41a3b97",
    measurementId: "G-19JD00DYJG"
})

export const auth = app.auth()
export default app