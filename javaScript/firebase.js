<script type="module">

console.log("FIREBASE SCRIPT STARTED");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {

  apiKey: "AIzaSyCMTF2C5Jm7qmoaPN-V7De6m9pTsEgHq7M",

  authDomain: "portfolio-visitor-tracke-e0e5a.firebaseapp.com",

  projectId: "portfolio-visitor-tracke-e0e5a",

  storageBucket: "portfolio-visitor-tracke-e0e5a.firebasestorage.app",

  messagingSenderId: "406072549967",

  appId: "1:406072549967:web:5282d67a263a326588403a"

};


const app = initializeApp(firebaseConfig);

console.log("Firebase Initialized");

const db = getFirestore(app);


async function testFirebase() {

  try {

    await addDoc(collection(db, "test"), {

      message: "Firebase Connected",

      time: new Date().toLocaleString()

    });

    console.log("SUCCESS");

  }

  catch(error) {

    console.error("ERROR:", error);

  }

}


testFirebase();

</script>