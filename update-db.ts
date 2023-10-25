import mongoose from "mongoose";
import axios from "axios";
import {Keys} from "./keys";

const FREQ = 1000 * .05 * 60; // update every 5 minutes (.05 is 3 sec)

// APRS API info
const name: string = `A4VU-11`;
const what: string = `loc`;
const apikey: string = Keys.APRS_API_KEY;
const format: string = `json`;
const url: string = `https://api.aprs.fi/api/get?name=${name}&what=${what}&apikey=${apikey}&format=${format}`;

mongoose.connect(Keys.MONGO_STRING);

// schema used for model
const dataSchema = new mongoose.Schema({
    curtime: Date,
    updatetime: Date,
    
    alt: Number,
    lat: Number,
    lng: Number,
    
    speed: Number,
    course: Number,
    
    tempc: Number,
    pres: Number,
    message: String
})
// model to use for db operations
export const TestData2 = mongoose.model("TestData2", dataSchema);

function updateDB() {

    axios.get(url).then((response) => {
        
        console.log("DB DATA:");

        const vals = response.data.entries[0].comment.split(" "); // access comment data

        const data = new TestData2({
            curtime: Date.now(),
            updatetime: new Date(response.data.entries[0].lasttime * 1000), // unix
            
            alt: response.data.entries[0].altitude, // meters
            lat: response.data.entries[0].lat,
            lng: response.data.entries[0].lng,
            
            speed: response.data.entries[0].speed, // km/h
            course: response.data.entries[0].course, // degrees from north
            
            tempc: parseFloat(vals[1]), // celcius
            pres: parseFloat(vals[2]), // hectopascals
            message: response.data.entries[0].status
        });
        
        // save to db
        data.save().then((result) => {
            console.log(result); // for monitoring
        });



    }).catch((error) => {

        console.error('Error:', error);
        // might want to disconnect db and terminate script?
    });
}

console.log(`---------Database is being updated---------`);
updateDB();
setInterval(updateDB, FREQ);

// close connection when done (CTRL+C)
process.on('SIGINT', () => {
    mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0); // Exit the process
});