import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RecruiterRepository } from 'src/user/repositories/recruiter.repository';
import { CreateNewsDto, UpdateNewsDto } from '../dto/news.dto';
import { NewsRepository } from '../repositories/news.repository';

@Injectable()
export class NewsService {
    constructor(
        private readonly newsRepository: NewsRepository,
        private readonly recruiterRepository: RecruiterRepository,
    ) {}

    async create(userId: string, newsData: CreateNewsDto) {
        const recruiter = await this.recruiterRepository.findByCondition({
            userId: userId,
        });

        newsData.recruiter = recruiter._id;

        const newNews = await this.newsRepository.create(newsData);

        return newNews;
    }

    async updateNews(
        userId: string,
        newsId: string,
        updateData: UpdateNewsDto,
    ) {
        const recruiter = await this.recruiterRepository.findByCondition({
            userId: userId,
        });

        const news = await this.newsRepository.findById(newsId);

        if (!news) {
            throw new HttpException(
                'Recruitment news is not found!',
                HttpStatus.NOT_FOUND,
            );
        }

        if (news.recruiter.toString() !== recruiter._id.toString()) {
            throw new HttpException(
                'You are not allowed!!',
                HttpStatus.BAD_REQUEST,
            );
        }

        const updatedNews = await this.newsRepository.findByIdAndUpdate(
            newsId,
            updateData,
        );

        return updatedNews;
    }

    async deleteNews(user, newsId) {
        const recuiter = await this.recruiterRepository.findByCondition({
            userId: user.id,
        });

        const news = await this.newsRepository.findById(newsId);

        if (
            !user.isAdmin &&
            news.recruiter.toString() !== recuiter._id.toString()
        ) {
            throw new HttpException(
                'You are not allowed to delete !',
                HttpStatus.BAD_REQUEST,
            );
        }

        await news.delete();

        return 'Delete news successfully!!';
    }

    async getAllNews() {
        const newsList = await this.newsRepository.findByCondition(
            {},
            '',
            {},
            {
                path: 'recruiter',
                select: '-userId',
            },
        );

        return newsList;
    }

    async getNewsById(id: string) {
        const news = await await this.newsRepository.findById(id);
        if (!news) {
            throw new HttpException(
                'Recruitment news is not found!',
                HttpStatus.NOT_FOUND,
            );
        }

        return news.populate({ path: 'recruiter', select: '-userId' });
    }
}
