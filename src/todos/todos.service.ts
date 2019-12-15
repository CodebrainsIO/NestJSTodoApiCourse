import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Todo } from './todo.entity';
import { TodoDTO } from './dto/TodoDTO';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>,
        ) {}

    public async findAll(): Promise<Todo[]> {
        return await this.todoRepository.find();
    }

    public async findOne(options: object): Promise<Todo | null> {
        return await this.todoRepository.findOne(options);
    }

    public async findById(id: number): Promise<Todo | null> {
        return await this.todoRepository.findOneOrFail(id);
    }

    public async create(todo: TodoDTO): Promise<Todo> {
        return await this.todoRepository.save(todo);
    }

    public async update(id: number, newValue: TodoDTO): Promise<Todo | {}> {
        const todo = await this.todoRepository.findOneOrFail(id);
        try {
            await this.todoRepository.update(id, newValue);
            return await this.todoRepository.findOne(id);
        } catch {
            return { message: 'Invalid Todo' };
        }
    }

    public async delete(id: number): Promise<DeleteResult> {
        return await this.todoRepository.delete(id);
    }
}
