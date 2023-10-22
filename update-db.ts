import mongoose from "mongoose";
import axios from "axios";
import {Keys} from "./keys";

const FREQ = 1000 * .05 * 60; // update every 10 minutes (3 sec for now)

// APRS API info
let name: string = `A4VU-11`;
let what: string = `loc`;
let apikey: string = Keys.APRS_API_KEY;
let format: string = `json`;
let url: string = `https://api.aprs.fi/api/get?name=${name}&what=${what}&apikey=${apikey}&format=${format}`;

mongoose.connect(Keys.MONGO_STRING);

const dataSchema = new mongoose.Schema({
    time: Date,
    
    alt: Number,
    lat: Number,
    long: Number,
    velx: Number,
    vely: Number,
    tempc: Number,

    message: String,
})
const TestData1 = mongoose.model("TestData1", dataSchema);

// get data from api and add to db
// need to figure out what APRS returns first
function updateDB() {
    const data = new TestData1({
        time: Date.now(),
        alt: 0,
        lat: 0,
        long: 0,
        velx: 0,
        vely: 0,
        tempc: 0,
        message: "test",
    });

    data.save().then((result) => {
        console.log(result);
    });
}

updateDB();
setInterval(updateDB, FREQ);

// close connection when done (CTRL+C)
process.on('SIGINT', () => {
    mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0); // Exit the process
});