import { Module } from '@nestjs/common';
import { Job,JobSchema } from './entities/jobs.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { JobService } from '../jobs/services/jobs.service';
import { JobsController } from '../jobs/controllers/jobs.controller';
import { User, UserSchema} from '../users/entities/user.entity'

@Module({
  imports: [MongooseModule.forFeature([
    { name: Job.name, schema: JobSchema},
    { name: User.name, schema: UserSchema} 
  ])],
  controllers: [JobsController],
  providers: [JobService]
})
export class JobsModules {}
