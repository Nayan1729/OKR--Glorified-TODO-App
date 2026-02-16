import { ApiProperty } from '@nestjs/swagger';
import { CreateKeyResultDto } from '../../key-result/dto/create-key-result.dto';

export class CreateObjectiveDto {
  @ApiProperty({ example: 'Increase company revenue', description: 'The title of the objective' })
  title: string;

  @ApiProperty({ example: 'Achieve 10M revenue by Q4', description: 'Detailed description of the objective' })
  description: string;

  @ApiProperty({ type: [CreateKeyResultDto], required: false, description: 'List of key results associated with the objective' })
  keyResults?: CreateKeyResultDto[];
}
