import {Navigate, Outlet} from 'react-router-dom'
import { Cargando } from '../components/Cargando'
import useAuth from '../hooks/useAuth'


export const RouteProtect = () => {
    const { auth,cargando }=useAuth()

  
  if(cargando)return <Cargando/>
  return (
    <>
    {auth.id ?(
        <Outlet/>
    ):(
        <Navigate to='/login'/>
    )}


    </>
  )
}
