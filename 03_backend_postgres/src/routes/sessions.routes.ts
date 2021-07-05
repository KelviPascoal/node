import { Router } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

export const sessionsRoutes = Router();

sessionsRoutes.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const sessionsServices = new AuthenticateUserService();
    const { token, user } = await sessionsServices.execute({ email, password });

    const userInfo = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

    return res.status(200).json({ userInfo, token });

  } catch (err) {

    return res.status(400).json({ error: err.message });
  }
});
