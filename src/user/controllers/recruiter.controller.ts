import {
    Body,
    Controller,
    Post,
    Req,
    UseGuards,
    HttpException,
    HttpStatus,
    Put,
    Get,
    Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateRecruiterDto, UpdateRecruiterDto } from '../dto/recrutier.dto';
import { RecruiterService } from '../services/recruiter.service';

@Controller('recruiter')
export class RecruiterController {
    constructor(private readonly recruiterService: RecruiterService) {}

    @UseGuards(AuthGuard())
    @Post()
    async createRecruiter(@Req() req, @Body() data: CreateRecruiterDto) {
        if (!req.user.isRecruiter) {
            throw new HttpException(
                'You not allow to do that',
                HttpStatus.METHOD_NOT_ALLOWED,
            );
        }
        return this.recruiterService.create(req.user, data);
    }

    @UseGuards(AuthGuard())
    @Put()
    async updateRecruiter(@Req() req, @Body() data: UpdateRecruiterDto) {
        if (!req.user.isRecruiter) {
            throw new HttpException(
                'You are not allowed!!',
                HttpStatus.BAD_REQUEST,
            );
        }
        return this.recruiterService.updateRecruiter(req.user, data);
    }

    @Get('all')
    async getAllRecruiterInfo() {
        return this.recruiterService.getAllRecruiterInfo();
    }

    @Get(':id')
    async getRecruiterById(@Param('id') id: string) {
        return this.recruiterService.getRecruiterById(id);
    }
}
