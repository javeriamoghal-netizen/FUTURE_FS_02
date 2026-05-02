const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

// GET
router.get("/", async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ADD
router.post("/", async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.json(lead);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE ✅ (only small safety added)
router.put("/:id", async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ msg: "No data provided to update" });
    }

    const updated = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,   // 🔥 keeps your logic same
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: "Lead not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE ✅ (fixed)
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Lead.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ msg: "Lead not found" });
    }

    res.json({ msg: "Deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;