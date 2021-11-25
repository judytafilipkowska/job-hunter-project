const { Schema, model } = require("mongoose");
const geocoder = require('../utils/geocoder');
const jobSchema = new Schema(
  {
    addedBy: { type: Schema.Types.ObjectId, ref: "User" },
    appliedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
    position: { type: String, required: true },
    remote: { type: Boolean, required: true },
    wage: { type: Number, required: true },
    description: { type: String, required: true },
    companyName: { type: String },
    address: {
      type: String,
      required: true
    },
    location: {
      type: {
        type: String,
        enum: ['Point']
      },
      coordinates: {
        type: [Number],
        index: '2dsphere'
      },
      formattedAddress: String
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

//geocode and create location
jobSchema.pre('save', async function (next) {
  console.log('this', this);
  // const doc = await this.model.findOne(this.getQuery());

  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  };
  next();
});


const Job = model("Job", jobSchema);

module.exports = Job;
