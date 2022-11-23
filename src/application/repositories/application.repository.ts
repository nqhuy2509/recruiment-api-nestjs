import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base.repository';
import { Application } from '../models/application.model';

@Injectable()
export class ApplicationRepository extends BaseRepository<Application> {
    constructor(
        @InjectModel('Application')
        private readonly applicationModel: Model<Application>,
    ) {
        super(applicationModel);
    }
}
