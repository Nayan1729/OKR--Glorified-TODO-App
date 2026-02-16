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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ObjectiveService } from './objective.service';
import { CreateObjectiveDto } from './dto/create-objective.dto';
import { UpdateObjectiveDto } from './dto/update-objective.dto';

@ApiTags('objective')
@Controller('objective')
export class ObjectiveController {
  constructor(private readonly objectiveService: ObjectiveService) {}

  @Get()
  @ApiOperation({ summary: 'Get all objectives' })
  @ApiResponse({ status: 200, description: 'Return all objectives.' })
  getAll() {
    return this.objectiveService.getAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new objective' })
  @ApiResponse({ status: 201, description: 'The objective has been successfully created.' })
  create(@Body() objectiveDto: CreateObjectiveDto) {
    return this.objectiveService.create(objectiveDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an objective' })
  @ApiResponse({ status: 200, description: 'The objective has been successfully deleted.' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.objectiveService.deleteById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an objective' })
  @ApiResponse({ status: 200, description: 'The objective has been successfully updated.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedObjective: UpdateObjectiveDto,
  ) {
    return this.objectiveService.updateById(id, updatedObjective);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update the status of an objective' })
  @ApiResponse({ status: 200, description: 'The objective status has been successfully updated.' })
  @ApiBody({ schema: { type: 'object', properties: { isCompleted: { type: 'boolean' } } } })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('isCompleted') isCompleted: boolean,
  ) {
    return this.objectiveService.updateStatus(id, isCompleted);
  }
}
