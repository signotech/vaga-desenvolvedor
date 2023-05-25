import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JobDocument = Job & Document;

@Schema()
export class Job {
  @Prop()
  titulo: string;

  @Prop()
  descricao: string;

  @Prop()
  tipoContrato: 'CLT' | 'PJ' | 'Freelance';

  @Prop()
  salario: number;

  @Prop({ default: false })
  paused: boolean;
}

export const JobSchema = SchemaFactory.createForClass(Job);
