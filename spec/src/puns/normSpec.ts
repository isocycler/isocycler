import {computeLowerHalfNorm, computeNorm, computeUpperHalfNorm} from "../../../src/puns/norm"
import {Norm, Vector} from "../../../src/puns/types"

describe("computeNorm", (): void => {
    it("computes the count of notes in the potential pun", (): void => {
        const vector = [0, 1, -2, 0, 2] as Vector

        const actual = computeNorm(vector)

        const expected = 5 as Norm
        expect(actual).toBe(expected)
    })
})

describe("computeUpperHalfNorm", (): void => {
    it("computes the count of notes in the upper half of the potential pun (the positives)", (): void => {
        const vector = [0, 1, -2, 0, 2] as Vector

        const actual = computeUpperHalfNorm(vector)

        const expected = 3 as Norm
        expect(actual).toBe(expected)
    })
})

describe("computeLowerHalfNorm", (): void => {
    it("computes the count of notes in the lower half of the potential pun (the negatives, absolute valued)", (): void => {
        const vector = [0, 1, -2, 0, 2] as Vector

        const actual = computeLowerHalfNorm(vector)

        const expected = 2 as Norm
        expect(actual).toBe(expected)
    })
})
