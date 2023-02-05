import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ToDoDocument, ToDo } from './todo.shema';
import { Model } from 'mongoose';
import { createRequest, createResponse } from '../types';
import { JwtService } from '@nestjs/jwt';
import { ERROR_REST } from 'src/const/error';

@Injectable()
export class ToDoService {
  constructor(
    @InjectModel(ToDo.name) private readonly ToDoModel: Model<ToDoDocument>,
    private readonly jwtService: JwtService,
  ) { }

  async create(todoRequest: createRequest): Promise<createResponse> {
    const { title, description, payload } = todoRequest;

    const owner = await this.getIdFromPayload(payload);

    const { id } = await this.ToDoModel.create({
      title,
      description,
      owner,
    });

    return { id };
  }

  async get(payload: string): Promise<ToDo[]> {
    const owner = await this.getIdFromPayload(payload);
    return await this.ToDoModel.find({ owner });
  }

  async delete(id: number, payload: string): Promise<void> {
    try {
      const owner = await this.getIdFromPayload(payload);
      await this.ToDoModel.findOneAndRemove({ id, owner });
    } catch (error) {
      throw new Error(ERROR_REST.DELETE_ERROR);
    }
  }

  private async getIdFromPayload(payload: string): Promise<number> {
    const token: string = payload.split(' ')[1];

    const { id } = this.jwtService.decode(token) as any;

    return id;
  }
}
