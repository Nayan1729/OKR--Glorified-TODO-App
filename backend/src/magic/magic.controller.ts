import { Body, Controller, Post } from '@nestjs/common';
import { MagicService } from './magic.service';
import { ApiResponse } from '@nestjs/swagger';
import { CreateObjectiveDto } from '../objective/dto/create-objective.dto';

@Controller('objective/ai')
export class MagicController {
  constructor(private magicService: MagicService) { }

  @Post()
  performMagic(
    @Body() objectiveDto: Pick<CreateObjectiveDto, 'title' | 'description'>,
  ) {
    return this.magicService.generateOKR(objectiveDto);
  }

  @Post('/chat-bot')
  answerUserQuery(@Body('query') query: string) {
    return this.magicService.answerUserQuery(query);
  }
}
