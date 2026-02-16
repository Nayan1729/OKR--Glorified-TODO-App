import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ObjectiveModule } from './objective/objective.module';
import { KeyResultModule } from './key-result/key-result.module';
import { ConfigModule } from '@nestjs/config';
import { MagicModule } from './magic/magic.module';

@Module({
  imports: [
    ObjectiveModule,
    KeyResultModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MagicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
