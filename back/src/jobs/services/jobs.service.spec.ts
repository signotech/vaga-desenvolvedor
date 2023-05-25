import { Model } from 'mongoose';
import { JobService } from './job.service';
import { CreateJobsDto } from '../dto/create-jobs.dto';
import { UpdateJobsDto } from '../dto/update-jobs.dto';
import { Job, JobDocument } from '../entities/jobs.entity';
import { User, UserDocument } from '../../users/entities/user.entity';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

describe('JobService', () => {
  let jobService: JobService;
  let jobModel: Model<JobDocument>;
  let userModel: Model<UserDocument>;

  beforeEach(() => {
    jobModel = {} as Model<JobDocument>;
    userModel = {} as Model<UserDocument>;
    jobService = new JobService(jobModel, userModel);
  });

  describe('create', () => {
    it('should create a new job', async () => {
      const createJobDto: CreateJobsDto = {
        titulo: 'Desenvolvedor Full Stack',
        descricao: 'Descrição do trabalho',
        tipoContrato: 'CLT',
        salario: 5000,
      };

      const saveSpy = jest.spyOn(jobModel.prototype, 'save').mockResolvedValueOnce();

      await jobService.create(createJobDto);

      expect(saveSpy).toHaveBeenCalledWith();
    });
  });

  describe('findAll', () => {
    it('should find all jobs', async () => {
      const filters = { tipoContrato: 'CLT' };
      const sort = 'titulo';
      const page = 1;
      const limit = 10;

      const validLimits = [10, 20, 30, 40, 50];

      const findSpy = jest.spyOn(jobModel, 'find').mockReturnThis();
      const sortSpy = jest.spyOn(jobModel, 'sort').mockReturnThis();
      const limitSpy = jest.spyOn(jobModel, 'limit').mockReturnThis();
      const skipSpy = jest.spyOn(jobModel, 'skip').mockReturnThis();
      const countDocumentsSpy = jest.spyOn(jobModel, 'countDocuments').mockResolvedValueOnce(100);

      const result = await jobService.findAll(filters, sort, page, limit);

      expect(findSpy).toHaveBeenCalledWith(filters);
      expect(sortSpy).toHaveBeenCalledWith({ titulo: 1 });
      expect(limitSpy).toHaveBeenCalledWith(limit);
      expect(skipSpy).toHaveBeenCalledWith(0);
      expect(countDocumentsSpy).toHaveBeenCalledWith(filters);

      expect(result).toEqual({
        data: expect.any(Array),
        page,
        totalPages: 10,
        limits: validLimits,
      });
    });

    it('should throw BadRequestException for invalid limit', async () => {
      const filters = { tipoContrato: 'CLT' };
      const sort = 'titulo';
      const page = 1;
      const limit = 15;

      await expect(jobService.findAll(filters, sort, page, limit)).rejects.toThrowError(BadRequestException);
    });
  });

  describe('findOne', () => {
    it('should find a job by id', async () => {
      const id = '123';

      const findByIdSpy = jest.spyOn(jobModel, 'findById').mockReturnThis();
      const execSpy = jest.spyOn(jobModel, 'exec').mockResolvedValueOnce();

      await jobService.findOne(id);

      expect(findByIdSpy).toHaveBeenCalledWith(id);
      expect(execSpy).toHaveBeenCalledWith();
    });
  });

  describe('update', () => {
    it('should update a job', async () => {
      const id = '123';
      const updateJobDto: UpdateJobsDto = {
        titulo: 'Desenvolvedor Frontend',
      };

      const findByIdAndUpdateSpy = jest.spyOn(jobModel, 'findByIdAndUpdate').mockReturnThis();
      const execSpy = jest.spyOn(jobModel, 'exec').mockResolvedValueOnce();
      const job = {} as Job;

      jest.spyOn(jobModel, 'findById').mockReturnValueOnce(job);

      const result = await jobService.update(id, updateJobDto);

      expect(findByIdAndUpdateSpy).toHaveBeenCalledWith(id, updateJobDto, { new: true });
      expect(execSpy).toHaveBeenCalledWith();
      expect(result).toBe(job);
    });

    it('should throw BadRequestException if job is not found', async () => {
      const id = '123';
      const updateJobDto: UpdateJobsDto = {
        titulo: 'Desenvolvedor Frontend',
      };

      jest.spyOn(jobModel, 'findByIdAndUpdate').mockReturnThis();
      jest.spyOn(jobModel, 'exec').mockResolvedValueOnce(null);

      await expect(jobService.update(id, updateJobDto)).rejects.toThrowError(BadRequestException);
    });
  });

  describe('remove', () => {
    it('should remove a job', async () => {
      const id = '123';
      const job = {} as Job;

      jest.spyOn(jobModel, 'findByIdAndDelete').mockResolvedValueOnce(job);
      jest.spyOn(userModel, 'updateMany').mockResolvedValueOnce({});

      const result = await jobService.remove(id);

      expect(result).toBeDefined();
    });

    it('should throw BadRequestException if job is not found', async () => {
      const id = '123';

      jest.spyOn(jobModel, 'findByIdAndDelete').mockResolvedValueOnce(null);

      await expect(jobService.remove(id)).rejects.toThrowError(BadRequestException);
    });

    it('should throw InternalServerErrorException if user update fails', async () => {
      const id = '123';
      const job = {} as Job;

      jest.spyOn(jobModel, 'findByIdAndDelete').mockResolvedValueOnce(job);
      jest.spyOn(userModel, 'updateMany').mockRejectedValueOnce(new Error());

      await expect(jobService.remove(id)).rejects.toThrowError(InternalServerErrorException);
    });
  });

  describe('pause', () => {
    it('should pause a job', async () => {
      const id = '123';
      const job = {
        paused: false,
        save: jest.fn().mockResolvedValueOnce(),
      } as unknown as Job;

      jest.spyOn(jobModel, 'findById').mockResolvedValueOnce(job);

      const result = await jobService.pause(id);

      expect(result.paused).toBe(true);
      expect(job.save).toHaveBeenCalled();
    });

    it('should throw an error if job is not found', async () => {
      const id = '123';

      jest.spyOn(jobModel, 'findById').mockResolvedValueOnce(null);

      await expect(jobService.pause(id)).rejects.toThrowError(Error);
    });
  });

  describe('resume', () => {
    it('should resume a job', async () => {
      const id = '123';
      const job = {
        paused: true,
        save: jest.fn().mockResolvedValueOnce(),
      } as unknown as Job;

      jest.spyOn(jobModel, 'findById').mockResolvedValueOnce(job);

      const result = await jobService.resume(id);

      expect(result.paused).toBe(false);
      expect(job.save).toHaveBeenCalled();
    });

    it('should throw an error if job is not found', async () => {
      const id = '123';

      jest.spyOn(jobModel, 'findById').mockResolvedValueOnce(null);

      await expect(jobService.resume(id)).rejects.toThrowError(Error);
    });
  });
});
