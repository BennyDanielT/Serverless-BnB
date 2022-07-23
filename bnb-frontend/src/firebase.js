import {initializeApp} from 'firebase/app'
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyBI4U1JObKY2zZ6BcoSuk2p623XSrHyx-4",
  authDomain: "serverless-data-computing.firebaseapp.com",
  projectId: "serverless-data-computing",
  storageBucket: "serverless-data-computing.appspot.com",
  messagingSenderId: "446842848809",
  appId: "1:446842848809:web:55a7dba3a84d6c2ab0fe38"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}