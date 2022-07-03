export const numberValidator = (value: string) => {
  return isNaN(+value) ? 'Must be a number' : undefined;
};
