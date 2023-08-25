import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export class Location {
  @Prop({
    type: String,
    required: true,
  })
  type: 'Point';

  @Prop({ type: [Number, Number], required: true })
  coordinates: [number, number];
}

@Schema()
export class Bin {
  @Prop({
    type: String,
    enum: ['inactive', 'full', 'active'],
    default: 'inactive',
  })
  status: 'inactive' | 'full' | 'active';

  @Prop({
    type: Location,
    required: true,
    default: { type: 'Point', coordinates: [0.1, 0.1] },
  })
  loc: Location;

  @Prop({
    type: Number,
    min: 0,
    max: 100,
    isInteger: true,
    required: true,
    default: 0,
  })
  capacity: number;

  @Prop({
    type: Number,
    required: true,
    default: 0,
  })
  reports: number;

  @Prop({
    type: Boolean,
    required: true,
  })
  isBiodegradable: boolean;
}

export type BinDocument = HydratedDocument<Bin>;
export const BinSchema = SchemaFactory.createForClass(Bin);

BinSchema.index({ loc: '2dsphere' });
