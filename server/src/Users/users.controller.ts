/* 
we use path parameters to identify a specific resource
we use query parameters to filter or sort that resource

using Express native API is not a recommended approach to handle responses in NestJS
*/

import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  addUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.addUser(createUserDto);
    // when a specific property is accessed instead if body, other props won't be validated
  }
}
