import { Math } from "./Math.js";

describe("Calculator", () => {
    let calc: Math
    beforeEach(() => {
        calc = new Math()
    })

    it("should multiply two number correctly", () => {
        const response = calc.Multi(3,5);
        expect(response).toBe(15);
    })

    it("should subtract two number correctly", () => {
        const response = calc.sub(5,3);
        expect(response).toBe(2);
    })

    it("should divide two number correctly", () => {
        const response = calc.div(6,3);
        expect(response).toBe(2);
    })

    it("should sum two number correctly", () => {
        const response = calc.sum(1,2);
        expect(response).toBe(3);
    })
})
