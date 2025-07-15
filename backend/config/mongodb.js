import mongoose from "mongoose";
import "dotenv/config";

//connecting mongoose package with mongodb atlas server
const connectdb = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected");
    });

    const res = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
  }
  catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Exit with failure
  }
};

export default connectdb;

