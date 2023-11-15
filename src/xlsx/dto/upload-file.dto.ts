export class UploadFileDto {
  id: string;
  file: Express.Multer.File;
  range?: string;
  sheetName?: string;
}
