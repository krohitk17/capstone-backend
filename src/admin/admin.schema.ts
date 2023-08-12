import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { hash } from 'bcryptjs';
import configuration from 'src/configuration';

@Schema()
export class Admin {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop({ required: true, default: false })
  isSuper: boolean;
}

export type AdminDocument = HydratedDocument<Admin>;
export const AdminSchema = SchemaFactory.createForClass(Admin);

AdminSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await hash(
      this.password,
      configuration().bcryptConfig.salt,
    );
  }
  next();
});
