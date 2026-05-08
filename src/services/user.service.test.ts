import { UserService } from "./user.service.js";

describe("Testing user service", () => {
    let userService: UserService
    const name = "test"
    const email = "test@jest.com"
    const password = "123456789"
    const role = "DEFAULT"

    beforeAll(async () => {
        userService = new UserService()
    })

    it("should create a new user", async () => {
        const newUser = await userService.create({ name, email, password, role })

        expect(newUser).toHaveProperty("id")
        expect(newUser.email).toBe(email)
    })

    it.skip("Should reat a new user", async () => {
        const newUser = await userService.create({ name, email, password, role })

        expect(newUser).toHaveProperty("id")
        expect(newUser.email).toBe(email)
    })

    it("Should update a user ", async () => {
        const user = await userService.findByEmail(email)

        const role = "ADMIN"
        const updated = await userService.update(user!.id, { name, password })

        expect(updated).toHaveProperty("id")
        expect(updated.email).toBe(email)
    })

    it("Should delete a user", async () => {
        const user = await userService.findByEmail(email)
        const deleted = await userService.delete(user!.id)

        expect(deleted).toHaveProperty("id")
        expect(deleted.email).toBe(email)
    })

})
