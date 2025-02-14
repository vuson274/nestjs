// import { Injectable } from '@nestjs/common';
// import { diskStorage } from 'multer';
// import * as path from 'path';
// import { v4 as uuidv4 } from 'uuid';
// import { Express } from 'express';
//
// @Injectable()
// export class FileUploadService {
//   getFileStorageOptions() {
//     return diskStorage({
//       destination: './uploads',
//       filename: (req, file, callback) => {
//         const filename = `${uuidv4()}-${file.originalname}`;
//         callback(null, filename);
//       },
//     });
//   }
//
// }
// import { Injectable } from '@nestjs/common';
// import * as multer from 'multer';
// import { FileInterceptor } from '@nestjs/platform-express';
//
// @Injectable()
// export class FileUploadService {
//   getFileStorageOptions(): multer.StorageEngine {
//     return multer.diskStorage({
//       destination: (req, file, cb) => {
//         cb(null, './uploads');
//       },
//       filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//       },
//     });
//   }
//
//   createFileInterceptor() {
//     return FileInterceptor('file', {
//       storage: this.getFileStorageOptions(),
//     });
//   }
// }
