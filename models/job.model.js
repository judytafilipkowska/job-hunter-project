const { Schema, model } = require("mongoose");

const jobSchema = new Schema(
  {
    addedBy: { type: Schema.Types.ObjectId, ref: "User" },
    position: { type: String, required: true },
    remote: { type: Boolean, required: true },
    location: { type: String, required: true },
    wage: { type: Number, required: true },
    description: { type: String, required: true },
    companyName: { type: String },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Job = model("Job", jobSchema);

module.exports = Job;
