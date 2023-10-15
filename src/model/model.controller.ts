import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ModelService } from './model.service';

@Controller()
export class ModelController {
  constructor(private readonly modelService: ModelService) {}

  @Post('predict')
  @UseInterceptors(FileInterceptor('img'))
  async predict(@UploadedFile() image): Promise<string> {
    const img = new Uint8Array(image.buffer);
    return await this.modelService.predict(img);
  }
}
