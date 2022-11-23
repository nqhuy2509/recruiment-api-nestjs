import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty() email: string;
    @IsNotEmpty() username: string;
    @IsNotEmpty() password: string;
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    doB: Date;
}

export class LoginUserDto {
    @IsNotEmpty() email: string;
    @IsNotEmpty() password: string;
}

export class UpdateUserDto {
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    doB: Date;
}
