import evaluate from "../utils/evaluate";

export const calculatorReducer = (state, action) => {
  switch (action.type) {
    case "appendDigit":
      if (state.currentOperand.length >= 18) return state;
      if (action.payload === "." && state.currentOperand.includes(".")) return state;
      return {
        ...state,
        currentOperand: state.currentOperand + action.payload
      };

    case "operator":
      if (state.currentOperand !== "" && state.prevOperand === "") {
        return {
          ...state,
          prevOperand: state.currentOperand,
          currentOperand: "",
          operator: action.payload
        };
      }

      if (state.currentOperand === "" && state.prevOperand !== "") {
        return { ...state, operator: action.payload };
      }

      if (state.currentOperand !== "" && state.prevOperand !== "") {
        return {
          ...state,
          prevOperand: evaluate(state),
          currentOperand: "",
          operator: action.payload
        };
      }
      return state;

    case "equals":
      if (state.currentOperand !== "" && state.prevOperand !== "") {
        return {
          ...state,
          currentOperand: evaluate(state),
          prevOperand: "",
          operator: ""
        };
      }
      return state;

    case "delete":
      if (state.currentOperand !== "") {
        return { ...state, currentOperand: state.currentOperand.slice(0, -1) };
      }
      return state;

    case "allClear":
      return { ...state, currentOperand: "", prevOperand: "", operator: "" };

    default:
      return state;
  }
};
