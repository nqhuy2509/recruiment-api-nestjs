import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { NewsModule } from './news/news.module';
import { ApplicationModule } from './application/application.module';

@Module({
    imports: [
        UserModule,
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGODB_URL, {
            useNewUrlParser: true,
        }),
        NewsModule,
        ApplicationModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
