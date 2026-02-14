import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateObjectiveDto } from './dto/create-objective.dto';
import { type UpdateObjectiveDto } from './dto/update-objective.dto';
import { Prisma } from '../../generated/prisma/client';

@Injectable()
export class ObjectiveService {
  constructor(private readonly prismaService: PrismaService) {}
  async getAll() {
    const objectives = await this.prismaService.objective.findMany({
      include: {
        keyResults: true,
      },
    });
    return objectives;
  }

  create(objectiveDto: CreateObjectiveDto) {
    return this.prismaService.objective.create({
      data: {
        title: objectiveDto.title,
        description: objectiveDto.description,
        keyResults: {
          create: objectiveDto.keyResults,
        },
      },
      include: {
        keyResults: true,
      },
    });
  }

  deleteById(id: number) {
    return this.prismaService.objective.delete({
      where: {
        id,
      },
    });
  }

  async updateById(id: number, updateObjectiveDto: UpdateObjectiveDto) {
    try {
      return await this.prismaService.objective.update({
        where: {
          id,
        },
        data: { ...updateObjectiveDto },
        include: { keyResults: true },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          // ####Make Custom Error class #####
          throw new NotFoundException('Objective not found');
        }
      }
      console.log(err);
    }
  }

  async updateByKeyResultChange(id: number) {
    const objective = await this.getOne(id);
    if (!objective) {
      throw new NotFoundException('Objective not found');
    }

    if (objective.keyResults.length === 0) {
      return this.updateStatus(objective.id, false);
    }

    const totalProgress = objective.keyResults.reduce((sum, kr) => {
      if (kr.targetProgress > 0) {
        return sum + kr.currentProgress / kr.targetProgress;
      }
      return sum;
    }, 0);

    const overallProgress = (totalProgress / objective.keyResults.length) * 100;
    const isCompleted = overallProgress >= 100;

    return await this.updateStatus(objective.id, isCompleted);
  }

  async updateStatus(id: number, isCompleted: boolean) {
    return this.prismaService.objective.update({
      where: {
        id,
      },
      data: {
        isCompleted,
      },
      include: {
        keyResults: true,
      },
    });
  }
  getOne(id: number) {
    try {
      return this.prismaService.objective.findUnique({
        where: {
          id,
        },
        include: {
          keyResults: true,
        },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
          throw new NotFoundException('Objective not found');
        }
      }
    }
  }
}
