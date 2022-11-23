import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base.repository';
import { Recruiter } from '../models/recruiter.model';

@Injectable()
export class RecruiterRepository extends BaseRepository<Recruiter> {
    constructor(
        @InjectModel('Recruiter')
        private readonly recruiterModel: Model<Recruiter>,
    ) {
        super(recruiterModel);
    }
}
