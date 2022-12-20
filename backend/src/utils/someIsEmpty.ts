
export const someIsEmpty = (values: Array<string | number >) => {
  const someIsNull = values.some((value) => {
    if(!value && value !== 0) {
      return true;
    }
    return false;
  });

  return someIsNull;
};
