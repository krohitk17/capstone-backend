import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class BinData {
  @Prop({
    type: String,
    enum: ['inactive', 'full', 'active'],
    immutable: true,
    default: 'inactive',
  })
  status: string;

  @Prop({
    type: { type: String, default: 'Point' },
    coordinates: [Number],
    min: [-180, -90],
    max: [180, 90],
  })
  location: [number, number];

  @Prop({ type: Number, min: 0, max: 100, isInteger: true })
  capacity: number;
}

export type BinDocument = HydratedDocument<BinData>;
export const BinSchema = SchemaFactory.createForClass(BinData);

BinSchema.pre('save', function () {
  if (this.isModified('capacity')) {
    this.status = this.capacity === 100 ? 'full' : 'available';
  }
});
