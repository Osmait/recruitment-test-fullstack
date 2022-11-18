import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { alertaInterface, errorInterfase } from "./Login";

export const Registro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los Campos son Obligatorios",
        error: true,
      });
      return;
    }

    const user = {
      email,
      password,
    };
    try {
      const url = `http://127.0.0.1:3000/api/user`;
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
    <div className="contenedor-auth login_container contenedor_login">
      <h1>Registro</h1>
      <form className="login" onSubmit={handleSubmit}>
        {msg && <p className="alerta">{msg}</p>}

        <label>Email</label>
        <input
          className="login_input"
          type={"text"}
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          className="login_input"
          type={"password"}
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login_submit" type={"submit"}>
          Registrar
        </button>
        <Link to={"/login"}>Login</Link>
      </form>
    </div>
  );
};
