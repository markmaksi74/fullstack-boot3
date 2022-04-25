// DTOs encapsulate data and send it from one app to another
// DTOs define the interfaces for the input and output of the application
// DTOs are used expect the shape of how the POST body would look like
// DTOs are used when you don't know what the payload to be

// all properties here are not optional

import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly surname: string;
}
