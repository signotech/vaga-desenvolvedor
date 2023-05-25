import { Test, TestingModule } from '@nestjs/testing';
import { JobsController } from './jobs.controller';
import { JobService } from '../services/jobs.service';
import { CreateJobsDto } from '../dto/create-jobs.dto';
import { UpdateJobsDto } from '../dto/update-jobs.dto';

describe('JobsController', () => {
  let controller: JobsController;
  let service: JobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JobsController],
      providers: [JobService],
    }).compile();

    controller = module.get<JobsController>(JobsController);
    service = module.get<JobService>(JobService);
  });

  it('should create a job', () => {
    const createJobsDto: CreateJobsDto = {
      title: 'Developer',
      description: 'A software developer position',
      salary: 5000,
    };

    const createdJob = {}; // Coloque aqui o objeto com os dados da vaga criada

    jest.spyOn(service, 'create').mockResolvedValue(createdJob);

    expect(controller.create(createJobsDto)).resolves.toBe(createdJob);
  });

  it('should get all jobs', () => {
    const sort = 'title';
    const filters = {};
    const page = 1;
    const limit = 20;

    const jobs = []; // Coloque aqui a lista de vagas retornada

    jest.spyOn(service, 'findAll').mockResolvedValue(jobs);

    expect(controller.findAll(sort, filters, page, limit)).resolves.toBe(jobs);
  });

  it('should get a job by ID', () => {
    const jobId = '123';

    const job = {}; // Coloque aqui o objeto da vaga retornado

    jest.spyOn(service, 'findOne').mockResolvedValue(job);

    expect(controller.findOne(jobId)).resolves.toBe(job);
  });

  it('should update a job', () => {
    const jobId = '123';
    const updateJobsDto: UpdateJobsDto = {
      title: 'Updated Developer',
      description: 'An updated software developer position',
      salary: 6000,
    };

    const updatedJob = {}; // Coloque aqui o objeto da vaga atualizada

    jest.spyOn(service, 'update').mockResolvedValue(updatedJob);

    expect(controller.update(jobId, updateJobsDto)).resolves.toBe(updatedJob);
  });

  // Adicione os demais testes para os outros métodos do controlador

});
