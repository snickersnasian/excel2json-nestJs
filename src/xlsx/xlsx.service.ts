import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { read, utils } from 'xlsx';
import { UploadFileDto } from './dto/upload-file.dto';
import path from 'path';
import { JSON_DIR_NAME } from './consts';
import jsonfile from 'jsonfile';
import { GetFileDto } from './dto/get-file.dto';

@Injectable()
export class XlsxService {
  getServiceInfo() {
    return {
      service: 'xlsx',
    };
  }

  getFile({ id, parsed }: GetFileDto) {
    return {
      id,
      parsed,
    };
  }

  handleFileUpload({ file, sheetName, id, range }: UploadFileDto) {
    if (!file) {
      throw new HttpException('No file provided', HttpStatus.BAD_REQUEST);
    }

    if (!id) {
      throw new HttpException('Id is not specified.', HttpStatus.BAD_REQUEST);
    } else if (id.length < 6) {
      return new HttpException(
        'Id has to be at lest 6 characters long.init -y',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const wb = read(file.buffer, { type: 'buffer' });
      const wbSheetName = sheetName || wb.SheetNames[0];
      const jsonDataArray = utils.sheet_to_json(wb.Sheets[wbSheetName], {
        header: 1,
        range,
      });

      const jsonData = {
        sheetContent: jsonDataArray,
      };

      // Generate a unique filename for the JSON file
      const fileId = id || Date.now().toString();
      const jsonFilePath = path.join(
        __dirname,
        JSON_DIR_NAME,
        `${fileId}.json`,
      );

      // Save the JSON data to the file
      jsonfile
        .writeFile(jsonFilePath, jsonData)
        .then(() => {
          const fileName = `${fileId}`;

          return { fileName };
        })
        .catch((error) => {
          console.error(error);
          throw new HttpException(
            'Error saving JSON file.',
            HttpStatus.CONFLICT,
          );
        });

      return {
        wbSheetName,
      };
    } catch (error) {
      throw new HttpException(
        `File processing error ${error}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
