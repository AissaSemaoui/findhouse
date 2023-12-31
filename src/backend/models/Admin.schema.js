import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

adminSchema.pre("save", async function (next) {
  try {
    if (this.isModified()) {
      await mongoose.models.PropertyListing.updateMany({
        "poster.id": this._id,
      }),
        {
          "poster.name": this.name,
          "poster.image": this.image,
          "poster.email": this.email,
        };
    }
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
});

delete mongoose.models.Admin;

export let AdminDB =
  mongoose.models.Admin || mongoose.model("Admin", adminSchema);
