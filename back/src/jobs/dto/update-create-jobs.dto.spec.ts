import { CreateJobsDto } from './create-jobs.dto';
import { UpdateJobsDto } from './update-jobs.dto';

describe('CreateJobsDto', () => {
  it('should create a new instance', () => {
    const createJobsDto = new CreateJobsDto();
    expect(createJobsDto).toBeDefined();
  });

  it('should have the correct properties', () => {
    const createJobsDto = new CreateJobsDto();
    expect(createJobsDto).toHaveProperty('titulo');
    expect(createJobsDto).toHaveProperty('descricao');
    expect(createJobsDto).toHaveProperty('tipoContrato');
    expect(createJobsDto).toHaveProperty('salario');
    expect(createJobsDto).toHaveProperty('paused');
  });
});

describe('UpdateJobsDto', () => {
  it('should create a new instance', () => {
    const updateJobsDto = new UpdateJobsDto();
    expect(updateJobsDto).toBeDefined();
  });

  it('should have the correct properties', () => {
    const updateJobsDto = new UpdateJobsDto();
    expect(updateJobsDto).toHaveProperty('titulo');
    expect(updateJobsDto).toHaveProperty('descricao');
    expect(updateJobsDto).toHaveProperty('tipoContrato');
    expect(updateJobsDto).toHaveProperty('salario');
    expect(updateJobsDto).toHaveProperty('paused');
  });
});
