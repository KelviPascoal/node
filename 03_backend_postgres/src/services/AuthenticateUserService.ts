import { compare } from "bcryptjs";
import { getRepository } from "typeorm";
import { User } from "../models/User";
import { sign } from "jsonwebtoken";
import authConfig from '../config/auth'

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { email: email } });

    if (!user) {
      throw new Error("Email ou senha invalido!");
    }
    const metchPassword = await compare(password, user.password);

    if (!metchPassword) {
      throw new Error("Email ou senha invalido!");
    }

    const token = sign({}, authConfig.jwt.secret , {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}

export { AuthenticateUserService };
