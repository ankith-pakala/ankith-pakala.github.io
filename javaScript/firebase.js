import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// FIREBASE CONFIG
const firebaseConfig = {

  apiKey: "YOUR_API_KEY",

  authDomain: "portfolio-visitor-tracke-e0e5a.firebaseapp.com",

  projectId: "portfolio-visitor-tracke-e0e5a",

  storageBucket: "portfolio-visitor-tracke-e0e5a.firebasestorage.app",

  messagingSenderId: "406072549967",

  appId: "1:406072549967:web:5282d67a263a326588403a"

};


// INITIALIZE FIREBASE
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// START TIME
const startTime = Date.now();


// STORE FIRESTORE DOC ID
let visitorDocId = null;


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
    else if (userAgent.includes("Safari")) {
      browser = "Safari";
    }
    else if (userAgent.includes("Firefox")) {
      browser = "Firefox";
    }


    // OS
    let os = "Unknown";

    if (userAgent.includes("Windows")) {
      os = "Windows";
    }
    else if (userAgent.includes("Mac")) {
      os = "MacOS";
    }
    else if (userAgent.includes("Android")) {
      os = "Android";
    }
    else if (userAgent.includes("iPhone")) {
      os = "iPhone";
    }


    // DEVICE
    let device =
      /Mobi|Android|iPhone/i.test(userAgent)
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

      entryTime: new Date().toLocaleString(),

      exitTime: null,

      timeSpent: 0

    };


    console.log(visitorData);


    // SAVE TO FIREBASE
    const docRef = await addDoc(
      collection(db, "visitors"),
      visitorData
    );


    // SAVE DOCUMENT ID
    visitorDocId = docRef.id;


    console.log("Saved To Firebase");


    // UPDATE TIME EVERY 15 SECONDS
    setInterval(async () => {

      if (!visitorDocId) return;

      const liveTime =
        Math.floor(
          (Date.now() - startTime) / 1000
        );

      await updateDoc(
        doc(db, "visitors", visitorDocId),
        {

          timeSpent: liveTime

        }
      );

      console.log(
        "Updated Time:",
        liveTime,
        "seconds"
      );

    }, 15000);


  }

  catch(error) {

    console.error(error);

  }

}


// TRACK VISITOR
trackVisitor();


// WHEN USER LEAVES WEBSITE
window.addEventListener(
  "beforeunload",
  async () => {

    try {

      if (!visitorDocId) return;

      const finalTime =
        Math.floor(
          (Date.now() - startTime) / 1000
        );

      await updateDoc(
        doc(db, "visitors", visitorDocId),
        {

          timeSpent: finalTime,

          onlineStatus: false,

          exitTime:
            new Date().toLocaleString()

        }
      );

      console.log(
        "Final Time Saved:",
        finalTime,
        "seconds"
      );

    }

    catch(error) {

      console.error(error);

    }

  }
);