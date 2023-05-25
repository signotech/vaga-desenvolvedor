import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { User, UserSchema } from './entities/user.entity';
import { Job,JobSchema } from '../jobs/entities/jobs.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: Job.name, schema: JobSchema },
  ])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
