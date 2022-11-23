import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base.repository';
import { News } from '../models/news.model';

@Injectable()
export class NewsRepository extends BaseRepository<News> {
    constructor(
        @InjectModel('News')
        private readonly newsModel: Model<News>,
    ) {
        super(newsModel);
    }
}
