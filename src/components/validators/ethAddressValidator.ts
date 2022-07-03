export const ethAddressValidator = (value: string) => {
  return value.match(/^0x[a-fA-F0-9]{40}$/) ? undefined : 'Must be valid address';
};
