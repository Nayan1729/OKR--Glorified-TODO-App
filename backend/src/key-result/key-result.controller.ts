import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { KeyResultService } from './key-result.service';
import { UpdatedKeyResultDTO } from './dto/updated-key-result.dto';
import { UpdateCurrentProgressDto } from './update-current-progress.dto';
import { CreateKeyResultDto } from './dto/create-key-result.dto';

@ApiTags('key-result')
@Controller('/objective/:objectiveId/key-result')
export class KeyResultController {
  constructor(private readonly keyResultService: KeyResultService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new key result for an objective' })
  @ApiResponse({ status: 201, description: 'The key result has been successfully created.' })
  @ApiParam({ name: 'objectiveId', type: 'number' })
  create(
    @Param('objectiveId', ParseIntPipe) objectiveId: number,
    @Body() createKeyResultDto: CreateKeyResultDto,
  ) {
    return this.keyResultService.create(objectiveId, createKeyResultDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all key results for an objective' })
  @ApiResponse({ status: 200, description: 'Return all key results for the objective.' })
  @ApiParam({ name: 'objectiveId', type: 'number' })
  getAllByObjetiveId(@Param('objectiveId', ParseIntPipe) objectiveId: number) {
    console.log(objectiveId);
    return this.keyResultService.getAllByObjectiveId(objectiveId);
  }

  @Get(':keyResultId')
  @ApiOperation({ summary: 'Get a specific key result' })
  @ApiResponse({ status: 200, description: 'Return the key result.' })
  @ApiParam({ name: 'objectiveId', type: 'number' })
  @ApiParam({ name: 'keyResultId', type: 'number' })
  getOne(
    @Param('objectiveId', ParseIntPipe) objectiveId: number,
    @Param('keyResultId', ParseIntPipe) id: number,
  ) {
    return this.keyResultService.getOne(objectiveId, id);
  }

  @Put(':keyResultId')
  @ApiOperation({ summary: 'Update a key result' })
  @ApiResponse({ status: 200, description: 'The key result has been successfully updated.' })
  @ApiParam({ name: 'objectiveId', type: 'number' })
  @ApiParam({ name: 'keyResultId', type: 'number' })
  update(
    @Param('objectiveId', ParseIntPipe) objectiveId: number,
    @Param('keyResultId', ParseIntPipe) id: number,
    @Body() updateKeyResultDto: UpdatedKeyResultDTO,
  ) {
    return this.keyResultService.updateOne(objectiveId, id, updateKeyResultDto);
  }

  @Delete(':keyResultId')
  @ApiOperation({ summary: 'Delete a key result' })
  @ApiResponse({ status: 200, description: 'The key result has been successfully deleted.' })
  @ApiParam({ name: 'objectiveId', type: 'number' })
  @ApiParam({ name: 'keyResultId', type: 'number' })
  delete(
    @Param('objectiveId', ParseIntPipe) objectiveId: number,
    @Param('keyResultId', ParseIntPipe) id: number,
  ) {
    return this.keyResultService.deleteOne(objectiveId, id);
  }

  @Patch(':keyResultId/progress')
  @ApiOperation({ summary: 'Update the progress of a key result' })
  @ApiResponse({ status: 200, description: 'The key result progress has been successfully updated.' })
  @ApiParam({ name: 'objectiveId', type: 'number' })
  @ApiParam({ name: 'keyResultId', type: 'number' })
  updateProgress(
    @Param('objectiveId', ParseIntPipe) objectiveId: number,
    @Param('keyResultId', ParseIntPipe) id: number,
    @Body() updateProgressDto: UpdateCurrentProgressDto,
  ) {
    return this.keyResultService.updateProgress(
      objectiveId,
      id,
      updateProgressDto,
    );
  }
}
