import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import {validateCreateuser} from '../../helpers/user.helper'
import { AuthGuard } from '@nestjs/passport';

// @UseGuards(AuthGuard('jwt'))
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    validateCreateuser(createUserDto)
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(
    @Query() filters: string,
    @Query("sort") sort: string,
    @Query('page') page: number,
    @Query('limit') limit: number
  ) {
    return this.usersService.findAll(filters, sort, page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Post(':userId/apply/:jobId')
  applyForJob(@Param('userId') userId: string, @Param('jobId') jobId: string) {
    return this.usersService.applyForJob(userId, jobId);
  }

  @Get(':userId/jobs')
  getJobs(
    @Param('userId') userId: string,
    @Query() filters: string,
    @Query("sort") sort: string,
    @Query('page') page: number,
    @Query('limit') limit: number
  ) {
    return this.usersService.getAplliedJobs(userId, filters, sort, page, limit);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
