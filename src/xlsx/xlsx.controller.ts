import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { XlsxService } from './xlsx.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileDto } from './dto/upload-file.dto';

@Controller('api/xlsx')
export class XlsxController {
  constructor(private readonly xlsxService: XlsxService) {}

  // api/xlsx/upload
  @Get('jsonContent/:fileId')
  getServiceInfo(
    @Param('fileId') id: string,
    @Query('parsed') parsed: boolean,
  ) {
    return this.xlsxService.getFile({
      id,
      parsed,
    });
  }

  // api/xlsx/upload
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadFileDto,
  ) {
    return this.xlsxService.handleFileUpload({ file, ...body });
  }
}
