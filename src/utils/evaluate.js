export default function evaluate({ currentOperand, prevOperand, operator }) {
  let output;

  switch (operator) {
    case "÷":
      if (currentOperand === "0") return "can't divide by 0";
      output = parseFloat(prevOperand) / parseFloat(currentOperand);
      break;
    case "×":
      output = parseFloat(prevOperand) * parseFloat(currentOperand);
      break;
    case "-":
      output = parseFloat(prevOperand) - parseFloat(currentOperand);
      break;
    case "+":
      output = parseFloat(prevOperand) + parseFloat(currentOperand);
      break;
  }
  
  return output.toString();
}