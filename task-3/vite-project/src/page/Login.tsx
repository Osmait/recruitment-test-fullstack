import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export interface alertaInterface {
  msg: string;
  error: boolean;
}
export interface errorInterfase {
  response: {
    data: {
      msg: string;
    };
  };
}

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();

  const { setAuth, setCargando } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlerta({
        msg: "Todos los Campos son Obligatorios",
        error: true,
      });
      return;
    }
    try {
      const url = `http://127.0.0.1:3000/api/login`;

      const { data } = await axios.post(url, { email, password });
      localStorage.setItem("x-token", data.token);
      setAlerta({});

      await setAuth(data.user);
      navigate("/");
      setCargando(false);
    } catch (error) {
      setAlerta({
        msg: (error as errorInterfase).response.data.msg,
        error: true,
      });
    }
  };
  const { msg } = alerta as alertaInterface;

  return (
    <div className="login_container">
      <h1>Login</h1>
      <form className="login" onSubmit={handleSubmit}>
        {msg && <p className="alerta">{msg}</p>}
        <label htmlFor="email">Email</label>
        <input
          className="login_input"
          id="email"
          type={"text"}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label htmlFor="password">Password</label>
        <input
          className="login_input"
          id="password"
          type={"password"}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input className="login_submit" type={"submit"} value="Login" />
      </form>
      <Link to={"/registrar"}>Registrar</Link>
    </div>
  );
};
