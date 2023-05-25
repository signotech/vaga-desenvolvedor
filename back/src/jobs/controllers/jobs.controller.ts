import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { JobService } from '../services/jobs.service';
import { CreateJobsDto } from '../dto/create-jobs.dto';
import { UpdateJobsDto } from '../dto/update-jobs.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';


@UseGuards(AuthGuard('jwt'))
@ApiTags('Vagas')
@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobService) { }

  
  @Post()
  create(@Body() createJobsDto: CreateJobsDto) {
    return this.jobsService.create(createJobsDto);
  }

  @Get()
 
  findAll(@Query('sort') sort: string, @Query() filters: any,  @Query('page') page: number, @Query('limit') limit: number) {
    return this.jobsService.findAll(filters, sort, page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobsDto: UpdateJobsDto) {
    return this.jobsService.update(id, updateJobsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(id);
  }
}
