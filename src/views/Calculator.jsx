/* eslint-disable react/prop-types */
import { useCalculatorOperations } from "../hooks/useCalculatorOperations";

// Style
import Style from './Calculator.module.css';



const Calculator = () => {
  const {state,handlers} = useCalculatorOperations();

  return (
    <div className="wrapper">
      <div>
        <button className={Style.mainButton} onClick={handlers.handleOnAddBlock}>Add row</button>
      </div>
      <ul>
        {state.ops.map((operation, index) => {
          return (
            <div key={index}>
              <CalcOperation
                operation={state.ops[index]}
                onSelectionChange={handlers.handleOnSelectionChange(index)}
                onToggleChange={handlers.handleOnToggleDisable(index)}
                onTextChange={handlers.handleOnTextChange(index)}
                onDelete={handlers.handleOnDelete(index)}
              />
            </div>
          );
        })}
      </ul>
      <h2>Result:{state.result}</h2>
      
    </div>
  );
};

/**
 *
 * @param {Object} props
 * @param {import("../hooks/useCalculatorOperations").IOperationState} props.operation
 * @param {number} props.index
 * @param {React.ChangeEventHandler<HTMLSelectElement> | undefined} props.onSelectionChange
 * @param {React.ChangeEventHandler<HTMLInputElement> | undefined}props.onTextChange
 * @param {React.MouseEventHandler<HTMLButtonElement> | undefined} props.onToggleChange
 */
const CalcOperation = (props) => {
  return (
    <li>
      <div>
      <select
        onChange={props.onSelectionChange}
        value={props.operation.operation}
      >
        <option value="+">+</option>
        <option value="-">-</option>
      </select>
      <input type="text" onChange={props.onTextChange} />
      <button className={Style.deleteButton} onClick={props.onDelete}>Delete</button>
      <button className={props.operation.isDisabled ? Style.Enable : Style.mainButton} onClick={props.onToggleChange}>
        {props.operation.isDisabled ? "Enable" : "Disable"}
      </button>
      </div>
      {props.operation.error && <p>{props.operation.error}</p>}
    </li>
  );
};


export default Calculator;
