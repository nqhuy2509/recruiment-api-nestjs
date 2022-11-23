import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateNewsDto, UpdateNewsDto } from '../dto/news.dto';
import { NewsService } from '../services/news.service';

@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('')
    async createNews(@Req() req, @Body() data: CreateNewsDto) {
        if (!req.user.isRecruiter) {
            throw new HttpException(
                'You are not allowed!',
                HttpStatus.METHOD_NOT_ALLOWED,
            );
        }
        return this.newsService.create(req.user.id, data);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async updateNews(
        @Req() req,
        @Param('id') id: string,
        @Body() data: UpdateNewsDto,
    ) {
        if (!req.user.isRecruiter) {
            throw new HttpException(
                'You are not allowed!',
                HttpStatus.METHOD_NOT_ALLOWED,
            );
        }

        return this.newsService.updateNews(req.user.id, id, data);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async deleteNews(@Req() req, @Param('id') id: string) {
        if (!req.user.isRecruiter && !req.user.isAdmin) {
            throw new HttpException(
                'You are not allowed!',
                HttpStatus.METHOD_NOT_ALLOWED,
            );
        }

        return this.newsService.deleteNews(req.user, id);
    }

    @Get('')
    async getAllNews() {
        return this.newsService.getAllNews();
    }

    @Get(':id')
    async getNewsById(@Param('id') id: string) {
        return this.newsService.getNewsById(id);
    }
}
