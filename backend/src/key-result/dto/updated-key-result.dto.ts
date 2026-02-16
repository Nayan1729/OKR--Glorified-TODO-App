import { ApiProperty } from '@nestjs/swagger';

export class UpdatedKeyResultDTO {
  @ApiProperty({ example: 1, description: 'The unique identifier of the key result' })
  id: number;

  @ApiProperty({ example: 'Increase conversion rate by 20%', description: 'The description of the key result' })
  description: string;

  @ApiProperty({ example: 50, description: 'The current progress value' })
  currentProgress: number;

  @ApiProperty({ example: 100, description: 'The target progress value' })
  targetProgress: number;
}
