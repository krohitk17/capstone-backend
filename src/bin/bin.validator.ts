import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'coordinatesFormat', async: false })
export class CoordinatesFormatConstraint
  implements ValidatorConstraintInterface
{
  validate(value: [number, number], args: ValidationArguments) {
    if (value && Array.isArray(value) && value.length === 2) {
      const [longitude, latitude] = value;
      if (
        typeof longitude === 'number' &&
        typeof latitude === 'number' &&
        longitude >= -180 &&
        longitude <= 180 &&
        latitude >= -90 &&
        latitude <= 90
      ) {
        return true;
      }
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Invalid coordinates format';
  }
}
