import {computePuns} from "../../src/isocycler"
import {Duration} from "../../src/types"

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

        const actual = computePuns(durations)

        expect(actual).toEqual(`-1,-1,0,0,0,0,2,0,0,0,0,1; error: 0.0000708; RPD: 0.00364%
-2,0,0,1,0,0,0,0,1,0,0,1; error: 0.000588; RPD: 0.0294%
1,0,0,1,0,-1,0,0,0,0,-1,-1; error: 0.000780; RPD: 0.0424%
1,0,1,0,0,0,0,0,-3,0,0,0; error: 0.00102; RPD: 0.0538%
0,0,1,0,1,0,0,0,0,0,-3,0; error: 0.000906; RPD: 0.0538%
0,1,0,1,0,0,0,0,0,-3,0,0; error: 0.000960; RPD: 0.0538%
0,0,0,1,0,1,0,0,0,0,0,-3; error: 0.000855; RPD: 0.0538%
0,-1,0,-1,0,0,0,0,1,1,1,0; error: 0.00102; RPD: 0.0574%
-1,0,-1,0,0,0,0,1,1,1,0,0; error: 0.00109; RPD: 0.0574%
0,0,-1,0,-1,0,0,0,0,1,1,1; error: 0.000967; RPD: 0.0574%
-1,0,0,0,0,-1,0,0,0,2,1,0; error: 0.00128; RPD: 0.0734%
0,-1,0,0,0,0,-1,0,0,0,2,1; error: 0.00121; RPD: 0.0734%
`)
    })
})
