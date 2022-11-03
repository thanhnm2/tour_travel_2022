// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCzr_whzBIUOJESw6QXi-pteqSZt6X7YdU",
    authDomain: "travel-booking-f3ed4.firebaseapp.com",
    databaseURL: "https://travel-booking-f3ed4-default-rtdb.firebaseio.com",
    projectId: "travel-booking-f3ed4",
    storageBucket: "travel-booking-f3ed4.appspot.com",
    messagingSenderId: "157649672876",
    appId: "1:157649672876:web:a5287e61e2f2a124f95d09",
    measurementId: "G-LEB7S5JC19"
};

var islogin = sessionStorage.getItem('login')
if (islogin == 1) {
    const accout = document.querySelector('.header__topbar__account')
    const user = document.querySelector('.header__topbar__user')
    accout.classList.add('hide')
    user.classList.remove('hide')
}
else {

    const accout = document.querySelector('.header__topbar__account')
    accout.classList.remove('hide')
    const user = document.querySelector('.header__topbar__user')

    user.classList.add('hide')

}
const handleLogout = document.querySelector('.header__topbar__user__list')
const logout = handleLogout.querySelector('.logout')
logout.addEventListener('click', () => {
    sessionStorage.setItem('login', 0)
    location.reload()
})

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth()


// Sign up
const signUpform = document.querySelector('.registerform')
const signUp = signUpform.querySelector('.btn_signup')
signUp.addEventListener('click', () => {
    var username = signUpform.querySelector('.username').value
    var email = signUpform.querySelector('.email').value
    var password = signUpform.querySelector('.password').value

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            set(ref(database, 'user/' + user.uid), {
                username: username,
                email: email
            })
            signUpform.querySelector('.username').value = ''
            signUpform.querySelector('.email').value = ''
            signUpform.querySelector('.password').value = ''

            alert('Created')
            location.reload()
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            alert(errorMessage + 'Code:' + errorCode)
        });
})
const signInform = document.querySelector('.loginform')
const signIn = signInform.querySelector('.btn_signin')
signIn.addEventListener('click', () => {

    var email = signInform.querySelector('.email').value
    var password = signInform.querySelector('.password').value


    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 

            const user = userCredential.user;
            let dt = new Date()
            update(ref(database, 'user/' + user.uid), {
                last_login: dt
            })

            signInform.querySelector('.email').value = ''
            signInform.querySelector('.password').value = ''
            sessionStorage.setItem('login', 1)
            localStorage.setItem('email', email)

            location.reload()
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage + 'Code:' + errorCode)
        });
}
)


