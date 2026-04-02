import { Router }  from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js"
import { PostController } from "../controller/post.controller.js";
//import { PostService } from "../services/post.service.js";

const postRouter = Router()
const postController = new PostController()

postRouter.post("/", postController.create)

postRouter.get("/", postController.getPosts)

postRouter.get("/:id", postController.getById)

postRouter.use(authMiddleware)

postRouter.put("/:id", postController.update)
postRouter.delete("/:id", postController.deletePosts)

export default postRouter



