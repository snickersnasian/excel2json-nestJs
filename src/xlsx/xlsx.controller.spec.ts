import { Test, TestingModule } from '@nestjs/testing';
import { XlsxController } from './xlsx.controller';

describe('XlsxController', () => {
  let controller: XlsxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [XlsxController],
    }).compile();

    controller = module.get<XlsxController>(XlsxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
