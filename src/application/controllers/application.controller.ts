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
import {
    CreateApplicationDto,
    UpdateApplicationDto,
} from '../dto/application.dto';
import { ApplicationService } from '../services/applications.service';

@Controller('apply')
export class ApplicationController {
    constructor(private readonly applicationService: ApplicationService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post(':id')
    async createApplication(
        @Req() req,
        @Param('id') id: string,
        @Body() data: CreateApplicationDto,
    ) {
        return this.applicationService.createApplication(req.user.id, id, data);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async updateApplication(
        @Req() req,
        @Param('id') id: string,
        @Body() data: UpdateApplicationDto,
    ) {
        if (!req.user.isRecruiter) {
            throw new HttpException(
                'You are not allowed!',
                HttpStatus.METHOD_NOT_ALLOWED,
            );
        }

        return this.applicationService.updateApplication(req.user, id, data);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async deleteApplication(@Req() req, @Param('id') id: string) {
        if (!req.user.isAdmin && !req.user.isRecruiter) {
            throw new HttpException(
                'You are not allowed',
                HttpStatus.METHOD_NOT_ALLOWED,
            );
        }
        return this.applicationService.deleteApplication(req.user, id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('news/:id')
    async getAllApplicationByNewsId(@Req() req, @Param('id') id: string) {
        if (!req.user.isAdmin && !req.user.isRecruiter) {
            throw new HttpException(
                'You are not allowed!!',
                HttpStatus.BAD_REQUEST,
            );
        }

        return this.applicationService.getAllApplicationByNewsId(req.user, id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async getApplicationById(@Req() req, @Param('id') id: string) {
        return this.applicationService.getApplicationById(req.user, id);
    }
}
