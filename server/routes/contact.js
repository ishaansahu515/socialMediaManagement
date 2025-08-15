import express from "express";
import Contact from "../models/Contact.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Create contact (optional auth)
router.post("/", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      package: selectedPackage,
      message,
    } = req.body;

    // Validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !selectedPackage ||
      !message
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Phone validation (example: 10 digits)
    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ message: "Invalid phone number" });
    }

    const contactData = {
      firstName,
      lastName,
      email,
      phone,
      package: selectedPackage,
      message,
      userId: req.user ? req.user._id : null,
    };

    const contact = new Contact(contactData);
    await contact.save();

    res.status(201).json({
      message: "Contact form submitted successfully",
      contact: {
        id: contact._id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone,
        package: contact.package,
        message: contact.message,
        createdAt: contact.createdAt,
      },
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ message: "Failed to submit contact form" });
  }
});

// Get user's contacts (authenticated)
router.get("/my-contacts", async (req, res) => {
  try {
    const contacts = await Contact.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    res.json({ contacts });
  } catch (error) {
    console.error("Get contacts error:", error);
    res.status(500).json({ message: "Failed to get contacts" });
  }
});

export default router;
