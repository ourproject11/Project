const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
require('dotenv').config();

app.use(express.json());
app.use(cors());

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zkkux1w.mongodb.net/?retryWrites=true&w=majority&appName=job-portal`;

const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1,
  connectTimeoutMS: 10000, // 10 seconds
  socketTimeoutMS: 45000, // 45 seconds
});

async function run() {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');

    const db = client.db("mernJobPortal");
    const jobsCollections = db.collection("demoJobs");

    app.post("/post-job", async (req, res) => {
      const body = req.body;
      body.createdAt = new Date();
      const result = await jobsCollections.insertOne(body);
      if (result.insertedId) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({
          message: "Cannot insert! Try again later",
          status: false
        });
      }
    });

    app.get("/all-jobs", async (req, res) => {
      const jobs = await jobsCollections.find({}).toArray();
      res.send(jobs);
    });

    app.get("/all-jobs/:id", async (req, res) => {
      const id = req.params.id;
      const job = await jobsCollections.findOne({ _id: new ObjectId(id) });
      res.send(job);
    });

    app.patch("/update-job/:id", async (req, res) => {
      const id = req.params.id;
      const jobData = req.body;
      delete jobData._id; // Exclude _id field from update
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          ...jobData
        },
      };
    
      try {
        const result = await jobsCollections.updateOne(filter, updateDoc);
        if (result.modifiedCount > 0) {
          // Job updated successfully
          res.status(200).json({ message: "Job updated successfully" });
        } else {
          // No job found with the given ID
          res.status(404).json({ message: "No job found with the given ID" });
        }
      } catch (error) {
        console.error("Error updating job:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    app.post("/apply-job/:id", async (req, res) => {
      const id = req.params.id;
      const applicationData = req.body;
      const job = await jobsCollections.findOne({ _id: new ObjectId(id) });

      if (!job) {
        return res.status(404).send({ message: "Job not found" });
      }

      // Validate application data here
      if (!isValidApplication(applicationData)) {
        return res.status(400).send({ message: "Invalid application data" });
      }

      const applicationsCollection = db.collection("jobApplications");
      applicationData.jobId = id;
      applicationData.appliedAt = new Date();

      const result = await applicationsCollection.insertOne(applicationData);

      if (result.insertedId) {
        return res.status(200).send({ message: "Application submitted successfully" });
      } else {
        return res.status(500).send({ message: "Failed to submit application" });
      }
    });

    app.get("/myJobs/:email", async (req, res) => {
      const jobs = await jobsCollections.find({ postedBy: req.params.email }).toArray();
      res.send(jobs);
    });

    app.delete("/job/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await jobsCollections.deleteOne(filter);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error('An error occurred while connecting to MongoDB:', err);
  }
}

run().catch(console.dir);

function isValidApplication(applicationData) {
  // Validate application data here
  // For example, check if all required fields are present and valid
  return (
    applicationData.firstName &&
    applicationData.lastName &&
    applicationData.email &&
    applicationData.resume
  );
}

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
