
import express from "express";
import { createContact, getContacts } from "../controller/contact.controller.js";

const router = express.Router();

router.post("/contact", createContact);
router.get("/contact", getContacts);  // 👈 for admin panel


export default router;
