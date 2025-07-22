import { RadioOption } from '../models/radio-option';

export function getDescription(options: RadioOption[], value: string): string {
  return options.find((option) => option.value === value)?.description ?? value;
}
