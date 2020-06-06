import { IValidation } from './fields/types';

export const validate = (
  value: string,
  rules: IValidation,
): { isValid: boolean; error: string | null } => {
  let isValid = true;
  let error = null;

  if (!rules) {
    return { isValid, error };
  }

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
    if (!isValid) {
      error = 'This field is required';
    }
  }

  return { isValid, error };
};
