import {useState , useMemo} from 'react'
import { isValidNumber } from '../utils/isNumberValidation';

/**
 *
 * @typedef {Object} IOperationState obj
 * @property {"+" | "-"} operation
 * @property {string} value
 * @property {boolean} isDisabled
 * @property {string | undefined} error
 */
/**
 *
 * @returns {IOperationState[]}
 */
function getInitialOperationState() {
    return [{ operation: "+", value: "", isDisabled: false }];
  }
export const useCalculatorOperations = ()=>{
    const [ops, setOps] = useState(getInitialOperationState());

    const handleOnAddBlock = () => {
      setOps((prevOperations) => [
        ...prevOperations,
        ...getInitialOperationState(),
      ]);
    };
    const handleOnToggleDisable = (currentIndex) => {
      return () => {
        const newOps = ops.map((value, index) => {
          if (index === currentIndex) {
            value.isDisabled = !value.isDisabled;
          }
          return value;
        });
        setOps(newOps);
      };
    };
    /**
     *
     * @param {number} selectedIndex
     * @returns {React.ChangeEventHandler<HTMLSelectElement>}
     */
    const handleOnSelectionChange = (selectedIndex) => {
      return (e) => {
        const newOps = ops.map((value, index) => {
          if (index === selectedIndex) {
            value.operation = e.target.value;
          }
          return value;
        });
        setOps(newOps);
      };
    };
    /**
     *
     * @param {number} selectedIndex
     * @returns {React.ChangeEventHandler<HTMLInputElement>}
     */
    const handleOnTextChange = (selectedIndex) => {
      return (e) => {
        const value = e.target.value
        const newOps = ops.map((op, index) => {
          if (index === selectedIndex ) {
            if( isValidNumber(value))
          {  op.value = e.target.value; op.error = undefined}
            else {
                op.error = 'please enter a valid number '
            }
          }
          return op;
        });
        setOps(newOps);
      };
    };
    const result = useMemo(() => {
      let result = 0;
      const enabledOps = ops.filter((op) => !op.isDisabled);
      for (let i = 0; i < enabledOps.length; i++) {
        const value = parseFloat(enabledOps[i].value);
        if (enabledOps[i].error || isNaN(value)) continue;
        if (enabledOps[i].operation === "+") {
          result += value;
        } else {
          result -= value;
        }
      }
      return result;
    }, [ops]);

    const handleOnDelete = (index)=>{
        return ()=>{
            const newOps = ops.filter((value,_index)=> _index !== index);
            setOps(newOps)
        }
    }

    return {
        state:{ops,result},
        handlers:{
            handleOnAddBlock,
            handleOnSelectionChange,
            handleOnTextChange,
            handleOnToggleDisable,
            handleOnDelete
        }
    };
}