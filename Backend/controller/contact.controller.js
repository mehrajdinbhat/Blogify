import Contact from "../models/contact.model.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    res
      .status(201)
      .json({ message: "Message sent successfully", contact: newContact });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving message", error: error.message });
  }
};


// get all contacts (for admin)
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts", error });
  }
};
