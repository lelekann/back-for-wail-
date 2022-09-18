import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      signOptions: {expiresIn: '60s'},
      secret: `${process.env.JWT_SECRET}`
    })
  ],
  providers: [AuthService, AuthResolver]
})
export class AuthModule {}
