import { Product } from "../components/Product";
import useBudget from "../hooks/useBudget";

export const Index = () => {
  const { cerrarSession } = useBudget();

  return (
    <section className="contenedor">
      <button onClick={cerrarSession}>Cerrar Seccion</button>
      <Product />
    </section>
  );
};
