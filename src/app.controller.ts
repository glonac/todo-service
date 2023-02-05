import { ToDoService } from './todo/todo.service';
import {
  Controller,
  Body,
  Post,
  UseGuards,
  Get,
  Headers,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller()
export class AppController {
  constructor(private readonly ToDoService: ToDoService) { }

  @Get()
  getHello(): string {
    return 'Todo service';
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(
    @Body() body: CreateTodoDto,
    @Headers() headers: { authorization: string },
  ) {
    return this.ToDoService.create({ ...body, payload: headers.authorization });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get')
  async fetchToDo(@Headers() headers: { authorization: string }) {
    return this.ToDoService.get(headers.authorization);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  async delete(
    @Headers() headers: { authorization: string },
    @Body() body: { id: number },
  ) {
    const { id } = body;
    return this.ToDoService.delete(id, headers.authorization);
  }
}
