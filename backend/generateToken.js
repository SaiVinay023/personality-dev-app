const admin = require("./config/firebase");

const generateToken = async () => {
  try {
    const token = await admin.auth().createCustomToken("f1K2ywkZUwVwXe5E8yhLDIZLS7h1");
    console.log("Generated Token:", token);
  } catch (error) {
    console.error("Error:", error);
  }
};

generateToken();
