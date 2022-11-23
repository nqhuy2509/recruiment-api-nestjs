import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecruiterSchema } from 'src/user/models/recruiter.model';
import { RecruiterRepository } from 'src/user/repositories/recruiter.repository';
import { NewsController } from './controllers/news.controller';
import { NewsSchema } from './models/news.model';
import { NewsRepository } from './repositories/news.repository';
import { NewsService } from './services/news.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'News',
                schema: NewsSchema,
            },
            {
                name: 'Recruiter',
                schema: RecruiterSchema,
            },
        ]),
    ],
    controllers: [NewsController],
    providers: [NewsService, NewsRepository, RecruiterRepository],
})
export class NewsModule {}
