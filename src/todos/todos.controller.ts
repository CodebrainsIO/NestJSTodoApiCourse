import {
    Controller,
    Get,
    Response,
    HttpStatus,
    Param,
    Body,
    Post,
    Request,
    Patch,
    Delete,
} from '@nestjs/common';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { TodosService } from './todos.service';
import { TodoDTO } from './dto/TodoDTO';

@ApiUseTags('todos')
@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService){}

    @Get()
    public async getTodos(@Response() res) {
        const todos = await this.todosService.findAll();
        return res.status(HttpStatus.OK).json(todos);
    }

    @Get('/:id')
    public async getTodo(@Response() res, @Param() param) {
        const todos = await this.todosService.findById(param.id);
        return res.status(HttpStatus.OK).json(todos);
    }

    @Post()
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async createTodo(
        @Response() res,
        @Body() todoDTO: TodoDTO,
    ) {
        const todo = await this.todosService.create(todoDTO);
        return res.status(HttpStatus.OK).json(todo);
    }

    @Patch('/:id')
    public async updateTodo(@Param() param, @Response() res, @Body() todoDTO: TodoDTO) {
        const todo = await this.todosService.update(param.id, todoDTO);
        return res.status(HttpStatus.OK).json(todo);
    }

    @Delete('/:id')
    public async deleteTodo(@Param() param, @Response() res) {
        const todo = await this.todosService.delete(param.id);
        return res.status(HttpStatus.OK).json(todo);
    }
}
