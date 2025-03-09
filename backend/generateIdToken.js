const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBSyh92OnPjlIilsbIJPgWr2YU7bxTSHa0",
  authDomain: "personality-dev-app.firebaseapp.com",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function getIdToken() {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, "testuser@example.com", "password123");
    const idToken = await userCredential.user.getIdToken();
    console.log("Generated ID Token:", idToken);
  } catch (error) {
    console.error("Error generating ID Token:", error.message);
  }
}

getIdToken();
