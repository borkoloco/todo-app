import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Todo } from "src/todo/entities/todo.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;
  @OneToMany(() => Todo, (todo) => todo.user, { onDelete: "CASCADE" })
  todos: Todo[];
}
