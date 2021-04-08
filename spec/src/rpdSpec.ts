import {computeVectorRpd} from "../../src/rpd"
import {Duration, Rpd, Vector} from "../../src/types"

describe("computeVectorRpd", (): void => {
    it("returns the relative percent difference between the total durations of the two halves of the potential pun", (): void => {
        const vector = [1, -1] as Vector
        const durations = [5, 4] as Duration[]

        const actual = computeVectorRpd(vector, durations)

        const expected = 2/9 as Rpd // |4-5|/avg(4,5)
        expect(actual).toEqual(expected)
    })
})
