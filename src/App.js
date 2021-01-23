import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [objectsOrbit, setObjectOrbit] = useState([]);
  const URL = "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY";

  // CALL TO API
  const filter = [];
  // CALL TO API
  useEffect(() => {
    const fetchItems = async () => {
      if (objectsOrbit != undefined) {
        try {
          const results = await axios.get(URL);
          setObjectOrbit(results.data);

          console.log("$$$$$$$$$$$$", objectsOrbit);
          for (let object in objectsOrbit) {
            filter.push([
              objectsOrbit[object].name,
              objectsOrbit[object].estimated_diameter.kilometers
                .estimated_diameter_min,
              objectsOrbit[object].estimated_diameter.kilometers
                .estimated_diameter_max,
            ]);
          }
          console.log("le filtre", filter);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchItems();
  }, []);

  return (
    <div className="App">
      <p>work in progress</p>
    </div>
  );
}

export default App;
