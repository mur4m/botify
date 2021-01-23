import "./App.css";
import axios from "axios";

function App() {
  const [objectsOrbit, setObjectOrbit] = useState([]);
  const URL = "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=DEMO_KEY";

  // CALL TO API
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    if (objectsOrbit != null) {
      try {
        const results = await axios.get(URL);
        // console.log("res.data !!!!! ", [results][0].data.near_earth_objects);
        const nearObjects = [results][0].data.near_earth_objects;
        const filter = [];

        [nearObjects].map((result, index) => {
          // console.log("name", result.length, typeof result);

          return filter.push([
            result[index].name,
            result[index].estimated_diameter.kilometers.estimated_diameter_min,
            result[index].estimated_diameter.kilometers.estimated_diameter_max,
          ]);
        });
        console.log("filtered array", filter);

        setObjectOrbit(filter);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="App">
      <p>work in progress</p>
    </div>
  );
}

export default App;
