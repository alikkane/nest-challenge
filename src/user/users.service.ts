import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DetailUserDto } from './dto/detail-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async findOne(email: string): Promise<DetailUserDto> {
        return this.userModel.findOne({ email: email });
    }

    async findByPayload({ email }: any): Promise<DetailUserDto> {
        return await this.findOne(email);
    }

    async findByLogin({ email, password }: LoginUserDto): Promise<DetailUserDto> {
        const user = await this.userModel.findOne({ email: email });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        // compare passwords    
        const areEqual = await bcrypt.compare(password, user.password);
        if (!areEqual) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }

    async create(userDto: CreateUserDto): Promise<DetailUserDto> {
        const { name, password, email } = userDto;
        
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // check if the user exists in the db    
        const userInDb = await this.userModel.findOne({ email: email });
        if (userInDb) {
            throw new HttpException("L'utilisateur existe déjà", HttpStatus.BAD_REQUEST);
        }
        const newUser = new this.userModel({ name: name, password: hashedPassword, email: email });
        const user = await newUser.save();
        return user;
    }
}
