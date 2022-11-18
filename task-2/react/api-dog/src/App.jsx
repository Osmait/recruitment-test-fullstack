import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function App() {
  const [breeds, setBreeds] = useState([]);
  const [image, setImage] = useState([]);
  const [breed, setBreed] = useState("affenpinscher");
  useEffect(() => {
    const consultAPI = async () => {
      const url = "https://dog.ceo/api/breeds/image/random/8";
      const { data } = await axios(url);

      setImage(data.message);
    };
    consultAPI();
  }, []);

  return (
    <div>
      <h1>Dog list</h1>

      <section className="conteiner">
        {image.map((img) => (
          <div key={img} className="contenido">
            <h2>{img.split("/")[4]}</h2>
            <div className="breen">
              <div className="conteiner-razas"></div>

              <div className="image">
                <img src={img} alt="" />
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
