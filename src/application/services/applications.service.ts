import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { NewsRepository } from 'src/news/repositories/news.repository';
import { RecruiterRepository } from 'src/user/repositories/recruiter.repository';
import {
    CreateApplicationDto,
    UpdateApplicationDto,
} from '../dto/application.dto';
import { ApplicationRepository } from '../repositories/application.repository';

@Injectable()
export class ApplicationService {
    constructor(
        private readonly applicationRepository: ApplicationRepository,
        private readonly newsRepository: NewsRepository,
        private readonly recruiterRepository: RecruiterRepository,
    ) {}
    async createApplication(
        userId: string,
        newsId: string,
        data: CreateApplicationDto,
    ) {
        data.newsId = newsId;
        data.userId = userId;

        const isExist = await this.applicationRepository.findByCondition({
            newsId: newsId,
            userId: userId,
        });

        if (isExist) {
            throw new HttpException(
                'You are applied this job',
                HttpStatus.BAD_REQUEST,
            );
        }

        const newAppy = await this.applicationRepository.create(data);

        return newAppy;
    }

    async updateApplication(user, id: string, data: UpdateApplicationDto) {
        const appliation = await this.applicationRepository.findById(id);

        const newsId = appliation.newsId;
        const news = await this.newsRepository.findById(newsId);
        const recruiter = await this.recruiterRepository.findByCondition({
            userId: user.id,
        });

        if (news.recruiter.toString() !== recruiter._id.toString()) {
            throw new HttpException(
                'You are not allowed to do that !!',
                HttpStatus.BAD_REQUEST,
            );
        }

        const updatedApplication =
            await this.applicationRepository.findByIdAndUpdate(id, data);
        return updatedApplication;
    }

    async deleteApplication(user, id: string) {
        const appliation = await this.applicationRepository.findById(id);

        const newsId = appliation.newsId;
        const news = await this.newsRepository.findById(newsId);
        const recruiter = await this.recruiterRepository.findByCondition({
            userId: user.id,
        });

        if (
            !user.isAdmin &&
            news.recruiter.toString() !== recruiter._id.toString()
        ) {
            throw new HttpException(
                'You are not allowed to do that !!',
                HttpStatus.BAD_REQUEST,
            );
        }

        await appliation.delete();
        return 'Delete application successfully!!';
    }

    async getApplicationById(user, id) {
        const application = await this.applicationRepository.findById(id);

        // // Kiểm tra đơn ứng tuyển có phải của người nộp đơn không
        if (
            !user.isAdmin &&
            !user.isRecruiter &&
            application.userId.toString() !== user.id
        ) {
            throw new HttpException(
                'You are not allowed !!',
                HttpStatus.BAD_REQUEST,
            );
        }

        // return application;

        // Kiểm tra tin tuyển dụng của đơn ứng tuyển có thuộc
        // đơn của nhà tuyển dụng
        const recruiter = await this.recruiterRepository.findByCondition({
            userId: user.id,
        });

        const news = await this.newsRepository.findById(application.newsId);
        if (
            user.isRecruiter &&
            news.recruiter.toString() !== recruiter._id.toString()
        ) {
            throw new HttpException(
                'You are not allowed !!!',
                HttpStatus.BAD_REQUEST,
            );
        }

        return await (
            await application.populate('newsId')
        ).populate({ path: 'userId', select: '-password' });
    }

    async getAllApplicationByNewsId(user, newsId) {
        const news = await this.newsRepository.findById(newsId);
        const recruiter = await this.recruiterRepository.findByCondition({
            userId: user.id,
        });

        if (
            !user.isAdmin &&
            news.recruiter.toString() !== recruiter._id.toString()
        ) {
            throw new HttpException(
                'You are not allowed !!!',
                HttpStatus.BAD_REQUEST,
            );
        }

        const applications = await this.applicationRepository.getByCondition(
            {
                newsId: newsId,
            },
            '',
            {},
            {
                path: 'userId',
                select: '-username -password -isAdmin -isRecruiter',
            },
        );

        return await applications;
    }
}
