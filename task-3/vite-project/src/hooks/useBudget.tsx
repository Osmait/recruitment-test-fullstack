import {useContext} from "react"
import BuggetContext from "../Context/BudgetProvider"

const useBudget = () => useContext(BuggetContext)

export default useBudget