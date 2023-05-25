import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job, JobDocument } from '../entities/jobs.entity';
import { User, UserDocument } from '../../users/entities/user.entity';
import { Model, QueryOptions } from 'mongoose';
import { CreateJobsDto } from '../dto/create-jobs.dto';
import { UpdateJobsDto } from '../dto/update-jobs.dto';

@Injectable()
export class JobService {
  constructor(
    @InjectModel(Job.name) private jobModel: Model<JobDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>

  ) { }

  async create(createJobDto: CreateJobsDto) {
    const job = new this.jobModel(createJobDto);
    return job.save();
  }

  async findAll(filters: any, sort: string, page: number = 1, limit: number = 20) {
    const sortObject = {}
    const filterObject = {}
    sortObject[sort] = 1

    const validLimits = [10, 20, 30, 40, 50]
    const limitNumber = Number(limit);
    if (!validLimits.includes(limitNumber)) {
      throw new BadRequestException('Limite invalido')
    }

    const validFilters = ['titulo', 'descricao', '_id', 'tipoContrato', 'salario']

    if (filters) {
      for (const field in filters) {
        if (validFilters.includes(field)) {
          const value = filters[field];
          filterObject[field] = value
        }
      }
    }

    const skip = (page - 1) * limit;
    const jobs = await this.jobModel
      .find(filterObject)
      .sort(sortObject)
      .limit(limit)
      .skip(skip);

    const totalJobs = await this.jobModel.countDocuments(filterObject);

    return {
      data: jobs,
      page,
      totalPages: Math.ceil(totalJobs / limit),
      limits: validLimits
    };
  }

  async findOne(id: any) {
    return this.jobModel.findById(id);
  }

  async update(id: string, updateJobDto: UpdateJobsDto) {
    const job = await this.jobModel.findByIdAndUpdate(id, updateJobDto, {
      new: true,
    });

    if (!job) {
      throw new BadRequestException('Vaga não encontrada');
    }

    return job;
  }

  async remove(id: string) {
    const job = await this.jobModel.findByIdAndDelete(id);
    if (!job) {
      throw new BadRequestException('Vaga não encontrada');
    }

    let result

    try {
      result = await this.userModel.updateMany(
        { appliedJobs: id },
        { $pull: { appliedJobs: id } },
      );

    } catch (error) {
      throw new InternalServerErrorException()
    }

    return result;
  }

  async pause(id: string) {
    const job = await this.jobModel.findById(id);
    if (!job) {
      throw new Error('Vaga não encontrada');
    }

    job.paused = true;
    return job.save();
  }

  async resume(id: string) {
    const job = await this.jobModel.findById(id);
    if (!job) {
      throw new Error('Vaga não encontrada');
    }

    job.paused = false;
    return job.save();
  }
}
