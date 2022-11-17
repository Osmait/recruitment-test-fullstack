import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
function App() {
  const [breeds, setBreeds] = useState([]);
  const [image, setImage] = useState([]);
  const [breed, setBreed] = useState("affenpinscher");
  useEffect(() => {
    const consultAPI = async () => {
      const url = "https://dog.ceo/api/breeds/list/all";
      const { data } = await axios(url);

      setBreeds(data.message);
    };
    consultAPI();
  }, []);
  useEffect(() => {
    const consultarImg = async () => {
      const url = `https://dog.ceo/api/breed/${breed}/images`;
      const { data } = await axios(url);
      setImage(data.message[0]);
      console.log(data.message[0]);
    };
    consultarImg();
  }, [breed]);
  console.log(breed);
  return (
    <div>
      <h1>Dog list</h1>
      <select
        className="select"
        name="breed"
        id=""
        onChange={(e) => setBreed(e.target.value)}
      >
        {Object.keys(breeds).map((a) => (
          <option key={a + Math.random} value={a} className="dog_Name">
            {a}
          </option>
        ))}
      </select>
      <section className="conteiner">
        <div className="contenido">
          <div className="breen">
            <div className="conteiner-razas">
              <ul className="razas">
                {breeds[breed].length > 0 ? (
                  <>
                    <li>{breeds[breed][0]}</li>
                  </>
                ) : (
                  ""
                )}
              </ul>
            </div>
            <div className="image">
              <img src={image} alt="" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
