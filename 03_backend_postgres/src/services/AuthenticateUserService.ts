import { compare } from "bcryptjs";
import { getRepository } from "typeorm";
import { User } from "../models/User";
import { sign } from "jsonwebtoken";

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

    const token = sign({}, "ccac7f72da5add3d5826ea2e0675ab85", {
      subject: user.id,
      expiresIn: "1d",
    });

    return { user, token };
  }
}

export { AuthenticateUserService };
