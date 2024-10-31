import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeepPartial } from "typeorm";
import { Todo } from "./entities/todo.entity";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>
  ) {}

  async create(createTodoDto: CreateTodoDto, userId: number) {
    const newTodo: DeepPartial<Todo> = {
      title: createTodoDto.title,
      createdAt: createTodoDto.createdAt,
      status: "pending", // Set initial status to 'pending'
      user: { id: userId } as User, // Cast to User to satisfy TypeScript
    };

    return await this.todoRepository.save(newTodo);
  }

  async findAll(userId: number) {
    return await this.todoRepository.find({
      where: {
        user: { id: userId },
      },
      order: {
        createdAt: "DESC",
      },
    });
  }

  async findOne(id: number) {
    const todo = await this.todoRepository.findOne({
      where: { id },
      relations: ["user"],
    });
    if (!todo) throw new NotFoundException({ message: "No such Todo" });
    return todo;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) throw new NotFoundException({ message: "No such Todo" });

    // Update the todo with new values
    return await this.todoRepository.save({ ...todo, ...updateTodoDto });
  }

  async remove(id: number) {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) throw new NotFoundException({ message: "No such Todo" });

    return await this.todoRepository.delete(id);
  }
}
