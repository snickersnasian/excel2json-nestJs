import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { XlsxModule } from './xlsx/xlsx.module';

@Module({
  imports: [ConfigModule.forRoot(), XlsxModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
