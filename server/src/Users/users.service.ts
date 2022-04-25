/*
in NestJS all services are providers
providers can inject dependencies
to inject a provider we use constructors
*/

import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      firstName: 'Mark',
      surname: 'Maksi',
    },
  ];

  findAll() {
    return this.users;
  }

  addUser(createUserDto: any) {
    this.users.push(createUserDto);
  }
}
