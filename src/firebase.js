// firebase.js
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAw-OwXzXGw-1SV-iZw9hsHnyAjEC6sy18",
    authDomain: "examination-emoji-chat.firebaseapp.com",
    databaseURL: "https://examination-emoji-chat.firebaseio.com",
    projectId: "examination-emoji-chat",
    storageBucket: "examination-emoji-chat.appspot.com",
    messagingSenderId: "979325476014"
};

firebase.initializeApp(config);
export default firebase;