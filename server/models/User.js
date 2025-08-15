import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 6 },
    subscription: {
      planType: {
        type: String,
        enum: ["starter", "growth", "pro-boost"],
        default: null,
      },
      startDate: { type: Date, default: null },
      expiryDate: { type: Date, default: null },
      isActive: { type: Boolean, default: false },
      razorpayOrderId: String,
      razorpayPaymentId: String,
      razorpaySignature: String,
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.hasActiveSubscription = function () {
  return (
    this.subscription.isActive &&
    this.subscription.expiryDate &&
    new Date() < this.subscription.expiryDate
  );
};

const User = mongoose.model("User", userSchema);
export default User;
