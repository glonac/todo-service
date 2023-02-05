import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { ToDoService } from './todo.service';
import { ToDoSchema, ToDo } from './todo.shema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/config/jwt';
import { JwtStrategy } from 'src/jwt/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ToDo.name, schema: ToDoSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      ...jwtConstants,
    }),
  ],
  providers: [ToDoService, JwtStrategy],
  exports: [ToDoService],
})
export class TodoModule { }
