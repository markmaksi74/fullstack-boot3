// Nest apps are used to modularize the application and grouping common functionalities together
/*
remove any providers or controllers from other modules that don't use them
*/

import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({ providers: [UsersService], controllers: [UsersController] })
export class UsersModule {}
