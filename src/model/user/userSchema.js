import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      unique: true,
      index: 1,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    favouriteProduct: [
      {
        _id: {
          type: mongoose.Types.ObjectId,
          required: false,
          unique: true,
        },
        title: {
          type: String,
          required: true,
        },
        slug: {
          type: String,

          required: true,
        },
        price: {
          type: Number,
          required: true,
        },

        sku: {
          type: String,

          required: true,
        },

        thumbnail: {
          type: String,
          required: true,
        },
      },
    ],

    refreshJWT: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema); ///users
