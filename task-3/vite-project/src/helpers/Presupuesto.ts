import { billsInterface } from "../components/Bills";
import { incomeInterface } from "../components/Incomes";

export const presupuestoDisponible = (bills: [], incomes: []) => {
  const gastos = bills.reduce(
    (total: number, gasto: billsInterface) => gasto.amount + total,
    0
  );

  const ingreso = incomes.reduce(
    (total: number, ingreso: incomeInterface) => ingreso.amount + total,
    0
  );
  return ingreso - gastos;
};
