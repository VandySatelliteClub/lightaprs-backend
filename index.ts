import axios from "axios";
import cors from "cors";
import mongoose from "mongoose";
import express from "express";

// use own keys.ts file
import {Keys} from "./keys";

// script to update db
import "./update-db";
import {TestData2} from "./update-db";

// current plan: sample data from api every ~10 min, store in db
// when request is made, return last few data points from db, and update whenever new data available

// Endpoints: get past mission data
//            check if active mission
//            get last 10 data points by time (first call, if active mission)
//            get latest data point (subsequent calls, if active mission)

// maybe add admin endpoints to update mission status?

const app = express();
app.use(cors());
const PORT = 3000;



// determines if active mission data
let curMission: boolean = false;

app.get("/past", (req, res) => {

  let mission = req.query.mission; // get name of mission

});

app.get("/current/mission?", (req, res) => {

  res.send(curMission);
  
});

app.get("/current/all", (req, res) => {

  // send mission data so far
  
});

app.get("/current/latest", (req, res) => {

  // send latest mission data
  
});


app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});
