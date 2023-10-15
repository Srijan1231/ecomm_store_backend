import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderItem: [
      {
        _id: { type: mongoose.Types.ObjectId, required: true },
        name: {
          type: String,
          required: true,
          maxLength: 150,
        },
        parentCat: {
          type: mongoose.Types.ObjectId,
          required: true,
          ref: "Product",
        },

        slug: {
          type: String,

          index: 1,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        salesPrice: {
          type: Number,
        },

        qty: {
          type: Number,
          required: true,
        },

        sku: {
          type: String,

          required: true,
        },
        ordqty: {
          type: Number,
          required: true,
        },
        color: {
          type: String,

          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        thumbnail: {
          type: String,
          required: true,
        },
        images: [
          {
            type: String,
          },
        ],
      },
    ],
    paymentStatus: {
      paymentOption: { type: String },
      status: { type: String },
      totalPrice: { type: Number },
    },
    userInfo: {
      _id: { type: mongoose.Types.ObjectId, required: true },
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
      shippingaddress: { type: String, required: true },

      email: {
        type: String,

        index: 1,
        required: true,
      },
      phNumber: {
        type: Number,
        required: true,
      },
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("orders", orderSchema);
