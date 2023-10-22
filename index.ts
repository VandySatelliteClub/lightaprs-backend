import axios from "axios";
import cors from "cors";

// use own keys.ts file
import {Keys} from "./keys";

let curMission: boolean;

// current plan: sample data from api every ~10 min, store in db
// when request is made, return last few data points from db, and update whenever new data available

// Endpoints: check if ongoing mission
//            get last 10 data points by time (first call)
//            get latest data point (subsequent calls)

// function fetchData() {
    
  // MOVE TO update-db.ts 
  //   axios.get(url)
  //     .then((response) => {
  //       console.log(`Response Status: ${response.status}`);
  //       console.log(`Time: ${response.data.entries[0].time}`);
  //       console.log(`Latitude: ${response.data.entries[0].lat}`);
  //       console.log(`Longitude: ${response.data.entries[0].lng}`);
  //       console.log();
  //       console.log();
  //       // After logging the data, wait for 3 seconds and then fetch again
  //       setTimeout(fetchData, 2000);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
        
  //       // If there's an error, wait for 3 seconds and then retry
  //       setTimeout(fetchData, 2000);
  //     });
  // }
  
  // Start the data fetching process
  // fetchData();

console.log("end");
