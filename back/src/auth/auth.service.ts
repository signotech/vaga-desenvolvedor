import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly jwtService: JwtService) { }

    async createToken(userId: number): Promise<string> {
        const payload = { sub: userId };
        return this.jwtService.signAsync(payload);
    }

    async verifyToken(token: string): Promise<any> {
        console.log(token,'token')
        try {
            const decoded = await this.jwtService.verifyAsync(token);
            return decoded;
        } catch (error) {
            throw new Error('Token inválido');
        }
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userModel.findOne({
            email, password
        })
        if (user) {
            return user;
        }

        throw new Error('Credenciais inválidas');
    }
}
