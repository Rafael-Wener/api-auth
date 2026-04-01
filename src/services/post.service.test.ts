import { PostService } from "./post.service.js";
import { UserService } from "./user.service.js"
 
describe("Testing post service", () => {
    let postService: PostService
    let userService: UserService

    const title = "test"
    const content = "test@jest.com"
    //let postId = 0
    let authorId = 0

    beforeAll(async () => {
        userService = new UserService()
        postService = new PostService()

        const newUser = await userService.create ({ 
            name:'teste', 
            email:'teste1231@email.com.br', 
            password:'senha1', 
            role:'DEFAULT'
        })

        authorId = newUser.id
    })

    it("should create a new post", async () => {
        const newUser = await postService.create({ title, content, authorId })

        expect(newUser).toHaveProperty("id")
        expect(newUser.title).toBe(title)
    })

    it.skip("Should creat a new post", async () => {
        const newUser = await postService.create({ title, content, authorId })

        expect(newUser).toHaveProperty("id")
        expect(newUser.title).toBe(title)
    })

})
