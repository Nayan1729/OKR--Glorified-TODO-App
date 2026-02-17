import { Module } from '@nestjs/common';
import { MagicController } from './magic.controller';
import { MagicService } from './magic.service';
import { ObjectiveService } from 'src/objective/objective.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [MagicController],
  providers: [ObjectiveService,PrismaService,MagicService]
})
export class MagicModule {}
