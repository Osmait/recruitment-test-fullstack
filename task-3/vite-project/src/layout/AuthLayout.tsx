import { Outlet } from "react-router-dom"


export const AuthLayout = () => {
  return (
    <>
    
    <section className="contenedor contenedor_login">

    <Outlet/>
    </section>
    </>
  )
}
