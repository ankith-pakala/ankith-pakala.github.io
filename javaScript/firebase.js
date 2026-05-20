import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// FIREBASE CONFIG
const firebaseConfig = {

  apiKey: "AIzaSyCMTF2C5Jm7qmoaPN-V7De6m9pTsEgHq7M",

  authDomain: "portfolio-visitor-tracke-e0e5a.firebaseapp.com",

  projectId: "portfolio-visitor-tracke-e0e5a",

  storageBucket: "portfolio-visitor-tracke-e0e5a.firebasestorage.app",

  messagingSenderId: "406072549967",

  appId: "1:406072549967:web:5282d67a263a326588403a"

};


// INITIALIZE FIREBASE
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// MAIN FUNCTION
async function trackVisitor() {

  try {

    // GET IP
    const ipData = await fetch(
      "https://api.ipify.org?format=json"
    );

    const ipJson = await ipData.json();

    const ip = ipJson.ip;

    // USER AGENT
    const userAgent = navigator.userAgent;

    // BROWSER
    let browser = "Unknown";

    if (userAgent.includes("Chrome")) {
      browser = "Chrome";
    }

    // OS
    let os = "Unknown";

    if (userAgent.includes("Windows")) {
      os = "Windows";
    } else if (userAgent.includes("Mac")) {
      os = "MacOS";
    }

    // DEVICE
    let device =
      /Mobi|Android/i.test(userAgent)
      ? "Mobile"
      : "Desktop";

    // VISITOR OBJECT
    const visitorData = {

      ip: ip,

      browser: browser,

      os: os,

      device: device,

      page: window.location.pathname,

      language: navigator.language,

      onlineStatus: navigator.onLine,

      platform: navigator.platform,

      screenWidth: screen.width,

      screenHeight: screen.height,

      timezone:
        Intl.DateTimeFormat()
        .resolvedOptions()
        .timeZone,

      time: new Date().toLocaleString()

    };

    console.log(visitorData);

    // SAVE TO FIREBASE
    await addDoc(
      collection(db, "visitors"),
      visitorData
    );

    console.log("Saved To Firebase");

  }

  catch(error) {

    console.error(error);

  }

}


trackVisitor();