/* eslint-disable no-unused-vars */
const https = require("http");

// Function to fetch user location based on IP
const fetchUserLocation = (ip) => {
  const apiURL = `https://ip-api.com/json/${ip}`;

  return new Promise((resolve, reject) => {
    https
      .get(apiURL, (apiRes) => {
        let data = "";

        // Fetch data in chunks
        apiRes.on("data", (chunk) => {
          data += chunk;
        });

        // Once all data is received
        apiRes.on("end", () => {
          try {
            const locationData = JSON.parse(data);
            resolve(locationData);
          } catch (error) {
            reject("Error parsing location data.");
          }
        });
      })
      .on("error", (err) => {
        reject("Error fetching location data: " + err.message);
      });
  });
};

module.exports = fetchUserLocation;
