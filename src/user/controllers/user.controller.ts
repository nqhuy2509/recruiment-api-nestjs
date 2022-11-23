import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Put,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from '../dto/user.dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @UseGuards(AuthGuard())
    @Get('profile')
    async getProfile(@Req() req) {
        return this.userService.getProfile(req.user);
    }

    @UseGuards(AuthGuard())
    @Put()
    async updateProfile(@Req() req, @Body() data: UpdateUserDto) {
        return await this.userService.updateUser(req.user.id, data);
    }

    @UseGuards(AuthGuard())
    @Delete(':id')
    async deleteUser(@Param('id') id: string, @Req() req) {
        if (!req.user.isAdmin) {
            throw new HttpException(
                'You are not allowed',
                HttpStatus.METHOD_NOT_ALLOWED,
            );
        }

        return await this.userService.deleteUser(id);
    }
}
