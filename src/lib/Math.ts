export class Math {
    sum(a: number, b: number) {
        return a + b;
    }

    Multi(a: number, b: number){
    return a * b;
    }

    sub(a: number, b: number){
        return a - b;
    }

    div(a: number, b: number) {
        if (typeof a !== 'number' || typeof b !== 'number' || b === 0) {
            return false;
        }
        return a / b;
    }
}
