import { PartialType } from "@nestjs/swagger";
import { CreateTodoDto } from "./create-todo.dto";
import { IsIn } from "class-validator";

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @IsIn(["pending", "in-progress", "complete"])
  status?: "pending" | "in-progress" | "complete";
}
