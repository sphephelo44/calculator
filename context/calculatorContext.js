import React, { useReducer } from "react";
import { calculatorReducer } from "../src/reducers/calculatorReducer";

const CalculatorContext = React.createContext();

const initialState = {
  prevOperand: "", 
  currentOperand: "", 
  operator: ""
};

export default function CalculatorProvider({ children }) {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  
  return (
    <CalculatorContext.Provider value={{ state, dispatch }}>
      {children}
    </CalculatorContext.Provider>
  );
}

export const useCalculator = () => React.useContext(CalculatorContext);