const express = require("express");
const Job = require("../models/Job");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Add Job API
router.post("/add", protect, async (req, res) => {
  try {
    const {
      companyName,
      role,
      status,
      jobDescription,
      notes,
    } = req.body;

    // Create new job
    const job = await Job.create({
      companyName,
      role,
      status,
      jobDescription,
      notes,
      user: req.user._id,
    });

    res.status(201).json({
      message: "Job added successfully",
      job,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// Get All Jobs API
router.get("/", protect, async (req, res) => {
  try {
    const jobs = await Job.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Jobs fetched successfully",
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});
// Update Job API
router.put("/:id", protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    // Check if job exists
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Check ownership
    if (job.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    // Update job
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Job updated successfully",
      updatedJob,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// Delete Job API
router.delete("/:id", protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    // Check if job exists
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Check ownership
    if (job.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    // Delete job
    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// Delete Job API
router.delete("/:id", protect, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    // Check if job exists
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // Check ownership
    if (job.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    // Delete job
    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

module.exports = router;