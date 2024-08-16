import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/app/infra/auth/guards/jwt.guard';
import { AwsService } from 'src/app/infra/aws/aws.service';

@ApiBearerAuth()
@ApiTags('uploadS3')
@Controller('upload')
@UseGuards(JwtAuthGuard)
export class AwsController {
  constructor(private readonly awsService: AwsService) {}

  @ApiOperation({ description: 'upload de imagens ao s3' })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const fileUrl = await this.awsService.uploadFile(file);
    return { url: fileUrl };
  }
}
