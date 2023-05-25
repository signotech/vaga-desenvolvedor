import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsModules } from './jobs/jobs.modules';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthController } from './auth/auth.controller';
import { jwtConstants } from './auth/constants';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://kinhos:user1234@cluster0.roruxle.mongodb.net/'),
    UsersModule,
    JobsModules,
    AuthModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
