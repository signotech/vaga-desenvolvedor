import { UsersService } from './users.service'
import { Model } from 'mongoose';
import { UserDocument, User } from '../entities/user.entity'
import { JobDocument, Job } from '../../jobs/entities/jobs.entity';
import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let usersService: UsersService;
  let userModel: Model<UserDocument>;
  let jobModel: Model<JobDocument>;

  beforeEach(() => {
    userModel = {} as Model<UserDocument>;
    jobModel = {} as Model<JobDocument>;
    usersService = new UsersService(userModel, jobModel);
  });

  describe('applyForJob', () => {
    it('should apply for a job successfully', async () => {
      const userId = 'user-id';
      const jobId = 'job-id';
      const user = { _id: userId, appliedJobs: [] } as unknown as User;
      const job = { _id: jobId, paused: false } as unknown as Job;

      userModel.findById = jest.fn().mockResolvedValue(user);
      // userModel.save = jest.fn().mockResolvedValue(user);
      jobModel.findById = jest.fn().mockResolvedValue(job);

      const result = await usersService.applyForJob(userId, jobId);

      expect(userModel.findById).toHaveBeenCalledWith(userId);
      expect(jobModel.findById).toHaveBeenCalledWith(jobId);
      expect(user.appliedJobs).toContain(jobId);
      // expect(userModel.save).toHaveBeenCalled();
      expect(result).toEqual(user);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const userId = 'user-id';
      const jobId = 'job-id';

      userModel.findById = jest.fn().mockResolvedValue(null);

      await expect(usersService.applyForJob(userId, jobId)).rejects.toThrow(NotFoundException);
      expect(userModel.findById).toHaveBeenCalledWith(userId);
    });

    it('should throw ConflictException if user has already applied for the job', async () => {
      const userId = 'user-id';
      const jobId = 'job-id';
      const user = { _id: userId, appliedJobs: [jobId] } as unknown as User;

      userModel.findById = jest.fn().mockResolvedValue(user);

      await expect(usersService.applyForJob(userId, jobId)).rejects.toThrow(ConflictException);
      expect(userModel.findById).toHaveBeenCalledWith(userId);
    });

    it('should throw NotFoundException if job is not found', async () => {
      const userId = 'user-id';
      const jobId = 'job-id';
      const user = { _id: userId, appliedJobs: [] } as unknown as User;

      userModel.findById = jest.fn().mockResolvedValue(user);
      jobModel.findById = jest.fn().mockResolvedValue(null);

      await expect(usersService.applyForJob(userId, jobId)).rejects.toThrow(NotFoundException);
      expect(userModel.findById).toHaveBeenCalledWith(userId);
      expect(jobModel.findById).toHaveBeenCalledWith(jobId);
    });

    it('should throw NotFoundException if job is paused', async () => {
      const userId = 'user-id';
      const jobId = 'job-id';
      const user = { _id: userId, appliedJobs: [] } as unknown as User;
      const job = { _id: jobId, paused: true } as unknown as Job;

      userModel.findById = jest.fn().mockResolvedValue(user);
      jobModel.findById = jest.fn().mockResolvedValue(job);

      await expect(usersService.applyForJob(userId, jobId)).rejects.toThrow(NotFoundException);
      expect(userModel.findById).toHaveBeenCalledWith(userId);
      expect(jobModel.findById).toHaveBeenCalledWith(jobId);
    });
  });

  // Outros testes para os métodos restantes...

});
