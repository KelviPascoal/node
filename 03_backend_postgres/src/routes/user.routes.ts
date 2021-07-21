import { request, Router } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";
import CreateUserServices from "../services/CreateUserServices";
import uploadConfig from "../config/uploadAvatar";
import multer from "multer";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

const userRouter = Router();
const upload = multer(uploadConfig);

userRouter.get("/lista", async (req, res) => {
  const userRepository = getRepository(User);
  const users = await userRepository.find();
  res.status(200).json(users);
});

userRouter.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userServices = new CreateUserServices();
    const user = await userServices.execute({ name, email, password });

    return res.status(200).json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

userRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  async (request, response) => {
    
    try {
      const updateUserAvatar = new UpdateUserAvatarService();
      const getFileName = request.file?.filename;

      if (getFileName) {
        const user = await updateUserAvatar.execute({
          user_id: request.user.id,
          avatarFilename: getFileName,
        });
        user.password = "private data!"

        return response.json(user);

      } else {
        throw new Error('Erro')
      }
      

    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
);
export { userRouter };
