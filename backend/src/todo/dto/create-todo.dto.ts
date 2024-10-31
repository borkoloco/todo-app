import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsIn } from "class-validator";

export class CreateTodoDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  createdAt: Date;

  @IsIn(["pending", "in-progress", "complete"])
  status: "pending" | "in-progress" | "complete" = "pending";
}
