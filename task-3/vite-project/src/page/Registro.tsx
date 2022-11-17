import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { alertaInterface, errorInterfase } from "./Login";

export const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ([email, password, nombre, apellido].includes("")) {
      setAlerta({
        msg: "Todos los Campos son Obligatorios",
        error: true,
      });
      return;
    }

    const user = {
      email,
      password,
      first_name: nombre,
      last_name: apellido,
    };
    try {
      const url = `${import.meta.env.VITE_URL_API}api/user`;
      const { data } = await axios.post(url, user);

      setAlerta({});
      navigate("/login");
    } catch (error) {
      setAlerta({
        msg: (error as errorInterfase).response.data.msg,
        error: true,
      });
    }
    setTimeout(() => {
      setAlerta({});
    }, 3000);
  };
  const { msg } = alerta as alertaInterface;

  return (
    <div>
      <h1>Registro</h1>
      <form className="login" onSubmit={handleSubmit}>
        {msg && <p className="alerta">{msg}</p>}
        <label>Nombre</label>
        <input
          className="login_input"
          type={"text"}
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <label>Apellidos</label>
        <input
          className="login_input"
          type={"text"}
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />

        <label>Email</label>
        <input
          className="login_input"
          type={"text"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          className="login_input"
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login_submit" type={"submit"}>
          Registrar
        </button>
      </form>
    </div>
  );
};
