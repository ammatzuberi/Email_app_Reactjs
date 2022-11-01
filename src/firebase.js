import firebase from "firebase/app"
import "firebase/auth"

const app=firebase.initializeApp({
    apiKey: "AIzaSyC3Un1-ixpKhlKAfJO4mkyUSv2roc3anes",
    authDomain: "auth-email-4044e.firebaseapp.com",
    projectId: "auth-email-4044e",
    storageBucket: "auth-email-4044e.appspot.com",
    messagingSenderId: "1051241598200",
    appId: "1:1051241598200:web:6253dfe99f7484b0c9bf0d"
})

export const auth=app.auth()
export default app