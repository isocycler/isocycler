import {computeAllPuns} from "../../../src/puns/all"
import {Duration, Pun} from "../../../src/puns/types"

describe("computePuns", (): void => {
    it("returns puns for the given durations, defaulting max norm to 5 and max RPD to 1%", (): void => {
        // 12-EDO durations
        const durations = [
            1,
            0.9438743126816935,
            0.8908987181403393,
            0.8408964152537146,
            0.7937005259840998,
            0.7491535384383408,
            0.7071067811865475,
            0.6674199270850172,
            0.6299605249474366,
            0.5946035575013605,
            0.5612310241546865,
            0.5297315471796477,
        ] as Duration[]

        const actual = computeAllPuns(durations)

        expect(actual).toEqual(jasmine.arrayWithExactContents([
            [[-1, -1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1], 0.0000707968710490503, 0.00003641983505935182] as Pun,
            [[-2, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1], 0.0005884873807988633, 0.00029420040709268166] as Pun,
            [[1, 0, 0, 1, 0, -1, 0, 0, 0, 0, -1, -1], 0.0007803054810396892, 0.0004239624156312721] as Pun,
            [[1, 0, 1, 0, 0, 0, 0, 0, -3, 0, 0, 0], 0.001017143298029488, 0.0005380599872028353] as Pun,
            [[0, 0, 1, 0, 1, 0, 0, 0, 0, 0, -3, 0], 0.00090617166037954, 0.0005380599872028543] as Pun,
            [[0, 1, 0, 1, 0, 0, 0, 0, 0, -3, 0, 0], 0.0009600554313264897, 0.0005380599872029002] as Pun,
            [[0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, -3], 0.0008553121531125196, 0.00053805998720295] as Pun,
            [[0, -1, 0, -1, 0, 0, 0, 0, 1, 1, 1, 0], 0.0010243786680753653, 0.0005737906626263152] as Pun,
            [[-1, 0, -1, 0, 0, 0, 0, 1, 1, 1, 0, 0], 0.0010852913934751296, 0.0005737906626263205] as Pun,
            [[0, 0, -1, 0, -1, 0, 0, 0, 0, 1, 1, 1], 0.0009668847112557222, 0.000573790662626364] as Pun,
            [[-1, 0, 0, 0, 0, -1, 0, 0, 0, 2, 1, 0], 0.0012846007190667752, 0.0007341432015001864] as Pun,
            [[0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 2, 1], 0.0012125016207796824, 0.0007341432015003266] as Pun,
        ]))
    })
})