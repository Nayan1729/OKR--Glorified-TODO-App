import { ApiProperty } from '@nestjs/swagger';

export class CreateKeyResultDto {
  @ApiProperty({ example: 'Increase conversion rate by 20%', description: 'The description of the key result' })
  description: string;

  @ApiProperty({ example: 20, description: 'The target progress value' })
  targetProgress: number;
}
