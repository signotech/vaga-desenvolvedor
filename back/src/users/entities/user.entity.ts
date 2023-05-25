import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  nome: string;

  @Prop()
  email: string;

  @Prop()
  telefone: string;

  @Prop()
  tipoContrato: 'CLT' | 'PJ' | 'Freelance';

  @Prop()
  password:string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Job' }] })
  appliedJobs: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
