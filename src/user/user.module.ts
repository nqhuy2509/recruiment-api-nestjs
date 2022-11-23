import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { UserRepository } from './repositories/user.repository';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/user.model';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './controllers/user.controller';
import { JwtStategy } from './jwt.strategy';
import { RecruiterController } from './controllers/recruiter.controller';
import { RecruiterService } from './services/recruiter.service';
import { RecruiterRepository } from './repositories/recruiter.repository';
import { RecruiterSchema } from './models/recruiter.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'User', schema: UserSchema },
            { name: 'Recruiter', schema: RecruiterSchema },
        ]),
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false,
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('SECRETKEY'),
                signOptions: {
                    expiresIn: configService.get('EXPIRESIN'),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController, UserController, RecruiterController],
    providers: [
        AuthService,
        UserRepository,
        UserService,
        JwtStategy,
        RecruiterService,
        RecruiterRepository,
    ],
})
export class UserModule {}
