import { Module } from '@nestjs/common';
import { loadUsersFromDisk, UsersRepository } from './users.repository';

@Module({
  providers: [
    {
      provide: UsersRepository,
      useFactory: () => new UsersRepository(loadUsersFromDisk()),
    },
  ],
  exports: [UsersRepository],
})
export class UsersModule {}
