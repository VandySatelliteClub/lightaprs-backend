import mongoose from "mongoose";
import axios from "axios";
import {Keys} from "./keys";

const FREQ = 1000 * 5 * 60; // update every 5 minutes

// APRS API info
const name: string = `A4VU-11`;
const what: string = `loc`;
const apikey: string = Keys.APRS_API_KEY;
const format: string = `json`;
const url: string = `https://api.aprs.fi/api/get?name=${name}&what=${what}&apikey=${apikey}&format=${format}`;

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

    let alt0 = -1;
    let lat0 = -1;
    let long0 = -1;
    let velx0 = -1;
    let vely0 = -1;
    let tempc0 = -1;
    let message0 = "You shouldn't see this.";

    axios.get(url).then((response) => {
        
        // parse the json into variables, process them

    }).catch((error) => {

        console.error('Error:', error);
        // might want to disconnect db and terminate script?
    });

    const data = new TestData1({
        time: Date.now(),
        alt: alt0,
        lat: lat0,
        long: long0,
        velx: velx0,
        vely: vely0,
        tempc: tempc0,
        message: message0
    });

    data.save().then((result) => {
        console.log(result); // for monitoring
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