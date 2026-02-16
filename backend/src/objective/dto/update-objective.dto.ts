import { ApiProperty } from '@nestjs/swagger';

export class UpdateObjectiveDto {
  @ApiProperty({ example: 1, description: 'The unique identifier of the objective' })
  id: number;

  @ApiProperty({ example: 'Increase company revenue', description: 'The title of the objective' })
  title: string;

  @ApiProperty({ example: 'Achieve 10M revenue by Q4', description: 'Detailed description of the objective' })
  description: string;

  @ApiProperty({ example: false, description: 'Whether the objective is completed' })
  isCompleted: boolean;

  @ApiProperty({ example: 50, description: 'The progress percentage of the objective' })
  progress: number;
}
