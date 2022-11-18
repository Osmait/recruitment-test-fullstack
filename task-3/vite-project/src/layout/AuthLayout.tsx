import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <>
      <section className="contenedor-auth contenedor_login">
        <Outlet />
      </section>
    </>
  );
};
