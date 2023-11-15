import { Module } from '@nestjs/common';
import { XlsxService } from './xlsx.service';
import { XlsxController } from './xlsx.controller';

@Module({
  providers: [XlsxService],
  controllers: [XlsxController],
})
export class XlsxModule {}
