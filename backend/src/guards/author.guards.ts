import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { TodoService } from "src/todo/todo.service";

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(private readonly todoService: TodoService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.params;
    const type = request.route.path.split("/")[2];
    let entity;
    switch (type) {
      case "todos":
        entity = await this.todoService.findOne(id);
        break;
    }
    const user = request.user;
    if (entity && user && user.id === entity.user.id) return true;
    return false;
  }
}
