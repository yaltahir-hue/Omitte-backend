const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let jobs = [];
let users = [];

app.get("/", (req, res) => {
  res.send("Omitte Backend is Running 🚀");
});

app.post("/register", (req, res) => {
  const user = req.body;
  users.push(user);
  res.json({ message: "User Registered", user });
});

app.post("/create-job", (req, res) => {
  const job = { id: Date.now(), ...req.body, status: "pending" };
  jobs.push(job);
  res.json({ message: "Job Created", job });
});

app.get("/jobs", (req, res) => {
  res.json(jobs);
});

app.post("/accept-job/:id", (req, res) => {
  const job = jobs.find(j => j.id == req.params.id);
  if (job) {
    job.status = "accepted";
    res.json({ message: "Job Accepted", job });
  } else {
    res.status(404).json({ message: "Job Not Found" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
