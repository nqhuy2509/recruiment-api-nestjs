import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsSchema } from 'src/news/models/news.model';
import { NewsRepository } from 'src/news/repositories/news.repository';
import { RecruiterSchema } from 'src/user/models/recruiter.model';
import { RecruiterRepository } from 'src/user/repositories/recruiter.repository';
import { ApplicationController } from './controllers/application.controller';
import { ApplicationSchema } from './models/application.model';
import { ApplicationRepository } from './repositories/application.repository';
import { ApplicationService } from './services/applications.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: 'Application',
                schema: ApplicationSchema,
            },
            {
                name: 'News',
                schema: NewsSchema,
            },
            { name: 'Recruiter', schema: RecruiterSchema },
        ]),
    ],
    controllers: [ApplicationController],
    providers: [
        ApplicationService,
        ApplicationRepository,
        NewsRepository,
        RecruiterRepository,
    ],
})
export class ApplicationModule {}
