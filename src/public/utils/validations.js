export const validate = (value, rules) => {
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
