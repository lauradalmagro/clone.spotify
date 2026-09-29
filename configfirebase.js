import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";

const firebaseConfig = {
apiKey: "AIzaSyAlQqAbPMxIn7kbx2xvjM9n5aPuLCl_1KQ",
authDomain: "clone-spotify-c5482.firebaseapp.com",
databaseURL: "https://clone-spotify-c5482-default-rtdb.firebaseio.com",
projectId: "clone-spotify-c5482",
storageBucket: "clone-spotify-c5482.firebasestorage.app",
messagingSenderId: "947032916009",
appId: "1:947032916009:web:93e6173daa16f1ff9c9c38",
measurementId: "G-RFGMF99VH6"
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);