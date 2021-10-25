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
      secret: 'hard!to-guess_secret', // process.env.SECRETKEY
      signOptions: {
        expiresIn: "10h", //process.env.EXPIRESIN
      },
    })],
    providers: [UsersService],
    exports: [UsersService]
  })
export class UserModule {}
