/*
in NestJS all services are providers
providers can inject dependencies
to inject a provider we use constructors
*/

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      firstName: 'Mark',
      surname: 'Maksi',
    },
    {
      firstName: 'Jackson',
      surname: 'Darlow',
    },
  ];

  findAll() {
    return this.users;
  }

  addUser(createUserDto: any, response) {
    const addedUser = createUserDto;
    const foundMatchedName = this.users.find((user) => {
      return user.firstName.toLowerCase() === addedUser.firstName.toLowerCase();
    });
    const foundMatchedSurname = this.users.find((user) => {
      return user.surname.toLowerCase() === addedUser.surname.toLowerCase();
    });
    if (!!foundMatchedName && !!foundMatchedSurname) {
      response.status(201).json(addedUser);
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
