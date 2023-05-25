export class CreateJobsDto {
  titulo: string;
  descricao: string;
  tipoContrato: 'CLT' | 'PJ' | 'Freelance';
  salario: number;
  paused?: boolean;
}