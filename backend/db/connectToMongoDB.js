import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://rohankrajendran:dT8iocAcdO7PcGRi@cluster0.qlvvubt.mongodb.net/?retryWrites=true&w=majority");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

export default connectToMongoDB;
