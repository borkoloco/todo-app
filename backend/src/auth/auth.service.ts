import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import * as argon2 from "argon2";
import { JwtService } from "@nestjs/jwt";
import { IUser } from "src/types";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findOne(email);
    const isMatch = await argon2.verify(user.password, pass);
    if (user && isMatch) {
      return user;
    }
    throw new UnauthorizedException({
      message: "User or password is incorrect",
    });
  }

  async login(user: IUser) {
    const { id, email } = user;
    return {
      id,
      email,
      token: this.jwtService.sign({ id, email }),
    };
  }
}
