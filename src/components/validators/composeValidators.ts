type ValidatorType = (value: string) => string | undefined;

export const composeValidators =
  (...validators: ValidatorType[]) =>
  (value: string) => {
    return validators.reduce((error, validator) => {
      return error || validator(value);
    }, undefined as unknown as string | undefined);
  };
