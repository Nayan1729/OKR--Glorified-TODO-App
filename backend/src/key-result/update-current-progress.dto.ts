import { ApiProperty } from '@nestjs/swagger';

export class UpdateCurrentProgressDto {
  @ApiProperty({ example: 45, description: 'The current progress value' })
  currentProgress: number;
}
