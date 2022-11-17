import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

type Props = {
  children: JSX.Element;
};

interface dataInterface {
  id: number;
  description: string;
  amount: number;
}

const BuggetContext = createContext<any>(undefined);

export const BuggetProvider = ({ children }: Props) => {
  const [alerta, setAlerta] = useState({});
  const [product, setProduct] = useState([]);

  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  const { auth } = useAuth();
  useEffect(() => {
    const ProductList = async () => {
      setCargando(true);
      const token = localStorage.getItem("x-token");
      if (!token) {
        setAlerta({
          msg: "No tienes autorizacion",
          error: true,
        });
        return;
      }
      const config = {
        headers: {
          "content-Type": "application/json",
          "x-token": token,
        },
      };
      try {
        const url = `http://127.0.0.1:3000/api/product`;
        const { data } = await axios.get(url, config);

        setProduct(data.data);
        setCargando(false);
      } catch (error) {
        console.log(error);
      }
    };
    ProductList();
  }, [, auth]);

  const cerrarSession = () => {
    localStorage.removeItem("x-token");

    navigate("/login");
  };

  return (
    <BuggetContext.Provider
      value={{
        setAlerta,
        alerta,
        product,
        cargando,

        cerrarSession,
      }}
    >
      {children}
    </BuggetContext.Provider>
  );
};

export default BuggetContext;
