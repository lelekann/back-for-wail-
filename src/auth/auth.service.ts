import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtServise: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOne(username);

        if(user && user.password === password) {
            const {password, ...userData} = user;
            return userData;
        }

        return null;
    }

    async login(loginUserInput: LoginUserInput): Promise<any> {
        const user = await this.validateUser(loginUserInput.username, loginUserInput.password);
        if (!user) {
            throw new UnauthorizedException();
        }

        return {
            access_token: this.jwtServise.sign({
                username: user.username,
                sub: user.id
            }),
            user
        };
    }

    async signup(loginUserInput: LoginUserInput): Promise<any> {
        const user = await this.userService.findOne(loginUserInput.username)

        if(user) {
            throw new Error('User already exists!')
        }

        return this.userService.create(loginUserInput);
    }
}
