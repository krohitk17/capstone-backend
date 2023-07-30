import { Controller } from '@nestjs/common';
import { BinService } from './bin.service';

@Controller('bin')
export class BinController {
  constructor(private readonly binService: BinService) {}
}
