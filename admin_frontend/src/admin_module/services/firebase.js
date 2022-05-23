import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyBe2yHtLQSVBZEa8qkxXVQpRvPCn0XGJZQ',
  authDomain: 'goodreads-app.firebaseapp.com',
  projectId: 'goodreads-app',
  storageBucket: 'goodreads-app.appspot.com',
  messagingSenderId: '118042663618',
  appId: '1:118042663618:web:3a851c480cdccd4e5eb95b',
  measurementId: 'G-L5TVM7NFV4',
};
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };
