import { IsNotEmpty } from 'class-validator';

export class CreateRecruiterDto {
    userId: string;
    @IsNotEmpty() name: string;
    desc: string;
    image: string;
}

export class UpdateRecruiterDto {
    name: string;
    desc: string;
    image: string;
}
