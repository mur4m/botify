import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Chart from "react-google-charts";

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
      <div style={{ display: "flex", maxWidth: 900 }}>
        <Chart
          width={400}
          height={300}
          chartType="ColumnChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["City", "2010 Population", "2000 Population"],
            ["New York City, NY", 8175000, 8008000],
            ["Los Angeles, CA", 3792000, 3694000],
            ["Chicago, IL", 2695000, 2896000],
            ["Houston, TX", 2099000, 1953000],
            ["Philadelphia, PA", 1526000, 1517000],
          ]}
          options={{
            title: "Population of Largest U.S. Cities",
            chartArea: { width: "30%" },
            hAxis: {
              title: "Total Population",
              minValue: 0,
            },
            vAxis: {
              title: "City",
            },
          }}
          legendToggle
        />
        <Chart
          width={400}
          height={"300px"}
          chartType="AreaChart"
          loader={<div>Loading Chart</div>}
          data={[
            ["Year", "Sales", "Expenses"],
            ["2013", 1000, 400],
            ["2014", 1170, 460],
            ["2015", 660, 1120],
            ["2016", 1030, 540],
          ]}
          options={{
            title: "Company Performance",
            hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
            vAxis: { minValue: 0 },
            // For the legend to fit, we make the chart area smaller
            chartArea: { width: "50%", height: "70%" },
            // lineWidth: 25
          }}
        />
      </div>
    </div>
  );
}

export default App;
