import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './users.service';

@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: process.env.TOKEN_EXPIRES_IN,
      },
    })],
    providers: [UsersService],
    exports: [UsersService]
  })
export class UserModule {}
