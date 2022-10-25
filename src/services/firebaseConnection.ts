import firebase from "firebase";
import 'firebase/firestore'

let firebaseConfig ={
    apiKey: "AIzaSyCn5LVhMophJk0ipbIPKrmNTZWZMrEmtk4",
  authDomain: "boardapp-dbbd9.firebaseapp.com",
  projectId: "boardapp-dbbd9",
  storageBucket: "boardapp-dbbd9.appspot.com",
  messagingSenderId: "97923021967",
  appId: "1:97923021967:web:0be4b156e002f0118a84fa",
  measurementId: "G-ZTFXFR6DVH"
}
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export default firebase