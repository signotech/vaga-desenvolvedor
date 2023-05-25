import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../entities/user.entity';
import { Model } from 'mongoose';
import { Job, JobDocument } from '../../jobs/entities/jobs.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Job.name) private jobModel: Model<JobDocument>
  ) { };

  create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    return user.save();
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

    const validFilters = ['nome', 'email', '_id', 'telefone', 'tipoContrato', 'appliedJobs']

    if (filters) {
      for (const field in filters) {
        if (validFilters.includes(field)) {
          const value = filters[field];
          filterObject[field] = value
        }
      }
    }

    const skip = (page - 1) * limit;
    const users = await this.userModel
      .find(filterObject)
      .sort(sortObject)
      .limit(limit)
      .skip(skip);

    const totalUsers = await this.userModel.countDocuments(filterObject);

    return {
      data: users,
      page,
      totalPages: Math.ceil(totalUsers / limit),
      limits: validLimits
    };
  }

  async getAplliedJobs(userId, filters, sort, page, limit: number = 20) {
    console.log('entrou')
    const user = await this.userModel.findById(userId);
    const appliedJobs = user.appliedJobs;

    const sortObject = {};
    const filterObject = {};
    sortObject[sort] = 1;

    const validLimits = [10, 20, 30, 40, 50];
    const limitNumber = Number(limit);

    if (!validLimits.includes(limitNumber)) {
      throw new BadRequestException('Limite inválido');
    }

    const validFilters = ['titulo', 'descricao', '_id', 'tipoContrato', 'salario'];

    if (filters) {
      for (const field in filters) {
        if (validFilters.includes(field)) {
          const value = filters[field];
          filterObject[field] = value;
        }
      }
    }

    const skip = (page - 1) * limit;
    const jobs = await this.jobModel
      .find({ _id: { $in: appliedJobs }, ...filterObject })
      .sort(sortObject)
      .limit(limitNumber)
      .skip(skip);

    return jobs;
  }


  findOne(id: string) {
    return this.userModel.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(
      { _id: id },
      { $set: updateUserDto },
      { new: true },
    );
  }

  remove(id: string) {
    return this.userModel.deleteOne({ _id: id }).exec();
  }

  async applyForJob(userId: string, jobId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (user.appliedJobs.includes(jobId)) {
      throw new ConflictException('Usuário já se candidatou para esta vaga');
    }

    const job = await this.jobModel.findById(jobId);
    if (!job) {
      throw new NotFoundException('Não é possivel mais se aplicar a essa vaga');
    }

    if (job.paused) {
      throw new NotFoundException('Não é possivel mais se aplicar a essa vaga');
    }

    user.appliedJobs.push(jobId);
    return user.save();
  }

  async withdrawApplication(userId: string, jobId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const index = user.appliedJobs.indexOf(jobId);
    if (index === -1) {
      throw new Error('Usuário não se candidatou para esta vaga');
    }

    user.appliedJobs.splice(index, 1);
    return user.save();
  }

  async pauseJob(jobId: string) {
    const users = await this.userModel.find({ appliedJobs: jobId });
    users.forEach((user) => {
      const index = user.appliedJobs.indexOf(jobId);
      if (index !== -1) {
        user.appliedJobs.splice(index, 1);
        user.save();
      }
    });
  }
}
export { User, UserDocument };

