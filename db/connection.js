const mongoose = require("mongoose");
const Local_URL = "mongodb://localhost:27017/jobsportal";
const LiveUrl =
  "mongodb+srv://kashishtiwari0707:kasshhh07@cluster0.2uwek4z.mongodb.net/jobsportal?retryWrites=true&w=majority&appName=Cluster0";

// const options = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 60000, // 60 seconds
//     socketTimeoutMS: 120000 // 120 seconds
// };

const connectDB = async () => {
  try {
    await mongoose.connect(Local_URL);
    console.log("Connection has been established");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};
module.exports = connectDB;
