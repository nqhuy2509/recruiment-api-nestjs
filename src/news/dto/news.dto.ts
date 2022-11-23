import { IsNotEmpty } from 'class-validator';

export class CreateNewsDto {
    recruiter: string;
    @IsNotEmpty() title: string;
    field: string;
    desc: string;
    require: string;
    quantity: number;
    benefits: string;
    submitDl: Date;
    status: string;
}

export class UpdateNewsDto {
    title: string;
    field: string;
    desc: string;
    require: string;
    quantity: number;
    benefits: string;
    submitDl: Date;
    status: string;
}
