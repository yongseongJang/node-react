export interface IFields {
  elementLabel: string;
  inputType: string;
  value: string;
  validation: IValidation;
  valid: boolean;
  errorMessage: string | null;
}

export interface IValidation {
  required: boolean;
}
