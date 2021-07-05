import { Router } from "express";
import { getRepository } from "typeorm";
import {User} from "../models/User";
import  CreateUserServices  from "../services/CreateUserServices";

export const userRouter = Router();

userRouter.get("/lista", async (req, res) => {
  const userRepository = getRepository(User);
  const users = await userRepository.find();
  res.status(200).json(users);
});

userRouter.post("/", async (req, res) => {

  try {
    const { name, email, password } = req.body;
    const userServices = new CreateUserServices();
    const user = await userServices.execute({ name, email, password }) ;
  
    return res.status(200).json(user);
  } catch(err) {
    return res.status(400).json({ error: err.message })
  }

});
