export const minValue = (min: number) => (value: string) => isNaN(+value) || +value >= min ? undefined : `Should be greater than ${min}`;
