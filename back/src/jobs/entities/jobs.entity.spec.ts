import { Job } from './job.model';
import { JobDocument } from './job.model';
import { Model } from 'mongoose';

describe('Job', () => {
  let jobModel: Model<JobDocument>;

  beforeAll(() => {
    jobModel = new Job().getModelForClass(Job);
  });

  it('should be defined', () => {
    expect(jobModel).toBeDefined();
  });

  it('should have the correct properties', () => {
    const job = new jobModel({
      titulo: 'Desenvolvedor Full Stack',
      descricao: 'Descrição do trabalho',
      tipoContrato: 'CLT',
      salario: 5000,
      paused: false,
    });

    expect(job).toHaveProperty('titulo');
    expect(job).toHaveProperty('descricao');
    expect(job).toHaveProperty('tipoContrato');
    expect(job).toHaveProperty('salario');
    expect(job).toHaveProperty('paused');
  });
});
