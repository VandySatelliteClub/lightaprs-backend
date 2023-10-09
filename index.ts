import mongoose from "mongoose";
import axios from "axios";
import cors from "cors";

// use own keys.ts file
import {Keys} from "./keys";

// current plan: sample data from api every ~10 min, store in db
// when request is made, return last few data points from db, and somehow update whenever new data available

// testing with a random guy's car :)

//let name: string = `A4VU`;
let name: string = `KM4PVB-9`
let what: string = `loc`;
let apikey: string = Keys.APRS_API_KEY;
let format: string = `json`;
let url: string = `https://api.aprs.fi/api/get?name=${name}&what=${what}&apikey=${apikey}&format=${format}`;

axios.get(url).then((response) => {
    
    console.log(`Response Status: ${response.status}`);
    console.log(`Time: ${response.data.entries[0].time}`);
    console.log(`Latitude: ${response.data.entries[0].lat}`);
    console.log(`longitude: ${response.data.entries[0].lng}`);

});

console.log("end");
