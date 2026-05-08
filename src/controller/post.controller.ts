import type { Request, Response } from "express"
import { PostService } from "../services/post.service.js"

const postService = new PostService()

export class PostController {

    //CRIA O POST
    // No seu PostController.ts
    async create(req: Request, res: Response) {
        try {
            const { title, content, userId } = req.body; // Verifique se os nomes batem com o JSON acima
            const post = await postService.create({ title, content, authorId: Number(userId) });
            return res.status(201).json(post);
        } catch (err) {
            return res.status(400).json({ error: "Erro ao criar post" });
        }
    }

    //PEGA O POST PELO USER
    async getPosts(req: Request, res: Response) {
        console.log(req.user)
        const posts = await postService.findByAuthor(Number(req.user))

        res.json(posts)
    }

    //DELETA O POST
    async deletePosts(req: Request, res: Response) {
        const idPost = Number(req.params.id)
        const post = await postService.findById(idPost)

        if (!post) {
            return res.status(404).json({ message: "Post não localizado" })
        }

        if (post.authorId === req.user) {
            await postService.delete(idPost)
            return res.status(204).send()
        } else {
            return res.status(403).json({ message: "Não autorizado" })
        }
    }

    //ATUALIZA O POST
    async update(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            const { title, content, authorId } = req.body

            const post = await postService.update(id, { title, content, authorId })

            return res.json(post)
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Erro ao atualizar Post" })
        }
    }

    //PEGA POST PELO ID
    async getById(req: Request, res: Response) {
        try {
            const id = Number(req.params.id)
            const post = await postService.findById(id)
            if (!post) {
                return res.status(404).json({ message: "Post nao encontrado" })
            }
            return res.json(post)
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Erro ao procurar Post" })
        }
    }
}
