export class CreateUserDto {
  nome: string;
  email: string;
  telefone: string;
  tipoContrato: 'CLT' | 'PJ' | 'Freelance';
  password: string;
  appliedJobs: string[]; 
}
