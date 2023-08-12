import { ObjectId } from 'mongodb';

export class AdminDto {
  _id: ObjectId;
  username: string;
  isSuper: boolean;
}

export class ResponseBinDto {
  _id: ObjectId;
  loc: number[];
  capacity: number;
  status: 'inactive' | 'full' | 'active';
}
