var signUp = document.getElementById('signUp');
var signIn = document.getElementById('signIn');
var logout = document.getElementById('logout');
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged ,signOut} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfxmroXVPcWzS1RNflXUkVvPPrMr-xPYU",
  authDomain: "e-commerce-eadb4.firebaseapp.com",
  databaseURL: "https://e-commerce-eadb4-default-rtdb.firebaseio.com",
  projectId: "e-commerce-eadb4",
  storageBucket: "e-commerce-eadb4.appspot.com",
  messagingSenderId: "30566080249",
  appId: "1:30566080249:web:b933eb47d1bf671858cc28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
signUp.addEventListener('click', (e) => {
  e.preventDefault();
  var email = document.getElementById('registerEmail').value;
  var password = document.getElementById('registerPassword').value;
  var username = document.getElementById('registerUsername').value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      set(ref(database, 'users/' + user.uid), {
        username: username,
        email: email,
      });
      alert('user created');
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
})

signIn.addEventListener('click', (e) => {
  e.preventDefault();
  var email = document.getElementById('loginName').value;
  var password = document.getElementById('loginPassword').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      const dt = new Date();
      update(ref(database, 'users/' + user.uid), {
        last_login: dt,

      });
      // document.getElementById('login').style.display='none'
      // document.getElementById('helloMsg').innerHTML="Welcome back" + email;
      alert('user logged in');
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
})
const user = auth.currentUser;

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // The user object has basic properties such as display name, email, etc.

    const email = user.email;
    console.log(email);
   

    document.getElementById('login').style.display='none';
    document.getElementById('logout').style.display='block'
      document.getElementById('helloMsg').innerHTML="Welcome back" + email;
    // The user's ID, unique to the Firebase project. Do NOT use
    // this value to authenticate with your backend server, if
    // you have one. Use User.getToken() instead.

    // ...
  } else {
    // User is signed out
    // ...
  }
});

logout.addEventListener('click', (e) => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      alert('user loged out');
      document.getElementById('logout').style.display='none'
      document.getElementById('login').style.display='block'
      document.getElementById('helloMsg').innerHTML=''
    })
    .catch((error) => {
      // An error happened.
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
    });
});
