const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    accountType: {type: String, required: true, possibleValues: ["Employer", "Job seeker"]},
    username: {type:String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    companyName: {type: String}, 
    location: {type: String, required: true},
    addPicture: String,
    addResume: String
    // addPicture: {data: Buffer},
    // addResume: {data: Buffer}
     },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
