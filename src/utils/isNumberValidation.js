/**
 * 
 * @param {string} value 
 * @returns 
 */
export const isValidNumber = (value) => {
    return !isNaN(typeof value === 'number' ? value:parseFloat(value)) && /^[0-9.]*$/.test(value);
  };
  