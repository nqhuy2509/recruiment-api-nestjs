import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateRecruiterDto, UpdateRecruiterDto } from '../dto/recrutier.dto';
import { User } from '../models/user.model';
import { RecruiterRepository } from '../repositories/recruiter.repository';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from './user.service';

@Injectable()
export class RecruiterService {
    constructor(
        private readonly recruiterRepository: RecruiterRepository,
        private readonly userRepository: UserRepository,
    ) {}

    async create(user: User, recruiterData: CreateRecruiterDto) {
        recruiterData.userId = user._id;
        const newRecruiter = await this.recruiterRepository.create(
            recruiterData,
        );
        return newRecruiter;
    }

    async updateRecruiter(user: User, recruiterData: UpdateRecruiterDto) {
        const recruiterInfo = await this.recruiterRepository.findByCondition({
            userId: user._id,
        });

        if (!recruiterInfo) {
            throw new HttpException(
                'Recruiter is not found',
                HttpStatus.NOT_FOUND,
            );
        }

        return await this.recruiterRepository.findByIdAndUpdate(
            recruiterInfo._id,
            recruiterData,
        );
    }

    async getAllRecruiterInfo() {
        const recruiters = await this.recruiterRepository.getByCondition(
            {},
            'name desc image',
            {},
            {
                path: 'userId',
                select: 'phone address email',
            },
        );
        return recruiters;
    }

    async getRecruiterById(id: string) {
        const recruiter = await this.recruiterRepository.findByCondition(
            {
                _id: id,
            },
            'name desc image',
            {},
            {
                path: 'userId',
                select: 'email phone  address',
            },
        );

        if (!recruiter) {
            throw new HttpException(
                'Recruiter is not found',
                HttpStatus.NOT_FOUND,
            );
        }

        return recruiter;
    }
}
