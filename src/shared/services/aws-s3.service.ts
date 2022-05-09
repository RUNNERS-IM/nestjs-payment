import { Injectable } from '@nestjs/common';
import { S3 } from '@aws-sdk/client-s3';
import mime from 'mime-types';

import type { IFile } from '../../interfaces';
import { ApiConfigService } from './api-config.service';
import { GeneratorService } from './generator.service';

@Injectable()
export class AwsS3Service {
  private readonly s3;

  constructor(public configService: ApiConfigService, public generatorService: GeneratorService) {
    const awsS3Config = configService.awsS3Config;

    const options = {
      region: awsS3Config.bucketRegion,
    };

    this.s3 = new S3(options);
  }

  async uploadImage(file: IFile): Promise<string> {
    // async uploadImage(file: IFile): Promise<string> {
    // const fileName = this.generatorService.fileName(<string>mime.extension(file.mimetype));
    // const key = 'images/' + fileName;
    // await this.s3
    //   .putObject({
    //     Bucket: this.configService.awsS3Config.bucketName,
    //     Body: file.buffer,
    //     ACL: 'public-read',
    //     Key: key,
    //   })
    //   .promise();
    //
    // return key;
    return await null;
  }
}
