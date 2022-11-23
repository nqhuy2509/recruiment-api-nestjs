import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from '../dto/user.dto';
import { UserRepository } from '../repositories/user.repository';

import * as bcrypt from 'bcrypt';
import { RecruiterRepository } from '../repositories/recruiter.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly recruiterRepository: RecruiterRepository,
    ) {}
    async create(userDto: CreateUserDto) {
        userDto.password = await bcrypt.hash(userDto.password, 10);

        const userInDb = await this.userRepository.findByCondition({
            email: userDto.email,
        });

        if (userInDb) {
            throw new HttpException(
                'User already exist',
                HttpStatus.BAD_REQUEST,
            );
        }
        return await this.userRepository.create(userDto);
    }

    async findByEmail(email) {
        return await this.userRepository.findByCondition({
            email: email,
        });
    }

    async findByLogin({ email, password }: LoginUserDto) {
        const user = await this.userRepository.findByCondition({
            email: email,
        });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        const is_equal = bcrypt.compareSync(password, user.password);
        if (!is_equal) {
            throw new HttpException(
                'Invalid credentials',
                HttpStatus.UNAUTHORIZED,
            );
        }
        return user;
    }

    async getProfile(user) {
        const { password, isAdmin, ...info } = user._doc;
        return info;
    }

    async updateUser(id: string, data: UpdateUserDto) {
        return await this.userRepository.findByIdAndUpdate(id, data);
    }

    async deleteUser(id: string) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        } else {
            if (user.isRecruiter) {
                await this.recruiterRepository.deleteByCondition({
                    userId: user._id,
                });
            }
            await this.userRepository.deleteOne(id);
            HttpStatus.OK;
            return 'User has been deleted';
        }
    }
}
