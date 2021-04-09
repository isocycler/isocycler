import {computePuns, Max, Norm, Pun, Rpd} from "../../../src/puns"
import * as computePunsModule from "../../../src/puns/puns"
import {Duration, RepRange, Vector} from "../../../src/puns/types"

describe("computePuns", (): void => {
    it("achieves exclusion of puns that are inverse equivalents by excluding those whose first non-zero term is not positive", (): void => {
        const maxNorm: Max<Norm> = 9 as Max<Norm>
        const maxRpd: Max<Rpd> = 0.01 as Max<Rpd>
        const puns: Pun[] = []
        const vector: Vector = [1] as Vector
        const durations: Duration[] = [1, 0.7937005259840998, 0.6299605249474366] as Duration[]
        const repetitionsRange: RepRange = 1 as RepRange

        computePuns(puns, vector, durations, maxNorm, maxRpd, repetitionsRange)

        // Okay, this is kind of a bad example, because literally every one of these puns' 1st nonzero el is negative
        // But the reason for that is: every one had to be flipped in order for the total of the negative numbers
        // To be less than the total of the positive numbers (among the terms of the vector)
        // So that the squares display with bigger (lower pitch) ones below
        // Which is the new rule (not flipping it so they all have positive error)
        // (because RPD which is always positive took over for error on that job)
        expect(puns).toEqual([
            // TODO: WHICH ALL PUNS, DEALING WITH OCTAVES
            //  deal with not including the end trailing zeroes later

            // TODO: WHICH ALL PUNS, DEALING WITH OCTAVES
            //  I think I just lost a thought,
            //  a really superficial tiny thought that has come and gone at least once before................
            //  oh yeah! it's just that we should assume octave equivalence for now, just bake it in
            //  I'll  accept dealing with it later if want to compose isocyclic Bohlen-Pierce with tritave-equivalence

            // TODO: WHICH ALL PUNS, DEALING WITH OCTAVES
            //  in other words this should actually be [-1,0,0, 0,0,0, 0,5,0]
            //  because you have to shift the -4 down two octaves
            //  (first to -2 then to -1)
            //  so you have to shift the 5 over to octaves, first to that next right 3-EDO vector chunk 0,0,0 then again
            //  - Though, later, I note that if you eliminate these powers of 2 like this
            //  You should think about whether that'd eliminate actually useful results
            //  Like for example these two results are eliminated
            //  until you increase the repetitions range to accommodate them
            //  But is that really right? Shouldn't we have kept them?
            //  I feel like there might be a slightly more complex condition we need to meet
            //  Which says to only throw away powers of 2 if it's provable that you could reduce the power of 2
            //  And shift everything to the right by that much while staying within the repetitions range
            //  But then it's a question of whether you want to go ahead and do that right away, or let the process
            //  Run its course and get there on its own, i.e. which way is more efficient computationally. Dunno.
            // [[-4, 5, 0], -0.03149737007950115, 0.007905467700100489] as Pun,
            [[-3, 3, 1], 0.011062102899736082, 0.003680581804137354] as Pun,
            // [[0, -4, 5], -0.02499947919921608, 0.007905467700100541] as Pun,
        ])
    })

    it("runs as efficiently as possible, only calling for the desired vectors, and once each only", (): void => {
        const maxNorm: Max<Norm> = 3 as Max<Norm>
        const maxRpd: Max<Rpd> = 0.24 as Max<Rpd>
        const puns: Pun[] = []
        // TODO: weird that I have to specify this, and above and below too
        //  Though it is good that we can just kick it off with [1]
        //  and then you'll never have to verify that the initial term is -1?
        //  No you probably still will, but at least you will simplify it for the first & maybe largest case?
        const vector: Vector = [1] as Vector
        const durations: Duration[] = [1, 0.7937005259840998, 0.6299605249474366] as Duration[]
        const repetitionsRange: RepRange = 1 as RepRange
        spyOn(computePunsModule, "computePuns").and.callThrough()

        computePunsModule.computePuns(puns, vector, durations, maxNorm, maxRpd, repetitionsRange)
        const actual = (computePunsModule.computePuns as jasmine.Spy).calls.all().map(({args: [_, vector]}) => vector)

        const expected = [
            // [0],
            [1],
            // TODO: WHICH ALL PUNS, DEALING WITH OCTAVES
            //  it's got to pass over this [2,0,0] but not actually call it, because it's got a power of 2
            //  similarly, there's no real sense checking this one [3,0,0]
            //  because there's not both at least one positive and at least one negative element in it
            //  Perhaps what we need is like one layer (which we've got already) which is good at crawling space
            //  And another layer that prevents wasting resources checking pointless crap
            //  And that will be covered by other tests that just see if those end up in the results
            [2],
            [3],
            [2, 1],
            [2, -1],
            [2, 0, 1],
            [2, 0, -1],
            [1, 1],
            [1, 2],
            [1, 1, 1],
            [1, 1, -1],
            [1, -1],
            [1, -2],
            [1, -1, 1],
            [1, -1, -1],
            [1, 0, 1],
            [1, 0, 2],
            [1, 0, -1],
            [1, 0, -2],
            // [0, 1],
            // [0, 2],
            // [0, 3],
            // [0, 2, 1],
            // [0, 2, -1],
            // [0, 1, 1],
            // [0, 1, 2],
            // [0, 1, -1],
            // [0, 1, -2],
            // [0, 0, 1],
            // [0, 0, 2],
            // [0, 0, 3],
        ] as Vector[]
        expect(actual).toEqual(expected)
    })

    it("handles repetitions range, extending the dimension of vector it searches", (): void => {
        const maxNorm: Max<Norm> = 3 as Max<Norm>
        const maxRpd: Max<Rpd> = 0.24 as Max<Rpd>
        const puns: Pun[] = []
        const vector: Vector = [1] as Vector
        const durations: Duration[] = [1, 0.7937005259840998, 0.6299605249474366] as Duration[]
        const repetitionsRange: RepRange = 2 as RepRange
        spyOn(computePunsModule, "computePuns").and.callThrough()

        computePunsModule.computePuns(puns, vector, durations, maxNorm, maxRpd, repetitionsRange)
        const actual = (computePunsModule.computePuns as jasmine.Spy).calls.all().map(({args: [_, vector]}) => vector)

        const expected = [
            [1],
            [2],
            [3],
            [2, 1],
            [2, -1],
            [2, 0, 1],
            [2, 0, -1],
            [2, 0, 0, 1],
            [2, 0, 0, -1],
            [2, 0, 0, 0, 1],
            [2, 0, 0, 0, -1],
            [2, 0, 0, 0, 0, 1],
            [2, 0, 0, 0, 0, -1],
            [1, 1],
            [1, 2],
            [1, 1, 1],
            [1, 1, -1],
            [1, 1, 0, 1],
            [1, 1, 0, -1],
            [1, 1, 0, 0, 1],
            [1, 1, 0, 0, -1],
            [1, 1, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, -1],
            [1, -1],
            [1, -2],
            [1, -1, 1],
            [1, -1, -1],
            [1, -1, 0, 1],
            [1, -1, 0, -1],
            [1, -1, 0, 0, 1],
            [1, -1, 0, 0, -1],
            [1, -1, 0, 0, 0, 1],
            [1, -1, 0, 0, 0, -1],
            [1, 0, 1],
            [1, 0, 2],
            [1, 0, 1, 1],
            [1, 0, 1, -1],
            [1, 0, 1, 0, 1],
            [1, 0, 1, 0, -1],
            [1, 0, 1, 0, 0, 1],
            [1, 0, 1, 0, 0, -1],
            [1, 0, -1],
            [1, 0, -2],
            [1, 0, -1, 1],
            [1, 0, -1, -1],
            [1, 0, -1, 0, 1],
            [1, 0, -1, 0, -1],
            [1, 0, -1, 0, 0, 1],
            [1, 0, -1, 0, 0, -1],
            [1, 0, 0, 1],
            [1, 0, 0, 2],
            [1, 0, 0, 1, 1],
            [1, 0, 0, 1, -1],
            [1, 0, 0, 1, 0, 1],
            [1, 0, 0, 1, 0, -1],
            [1, 0, 0, -1],
            [1, 0, 0, -2],
            [1, 0, 0, -1, 1],
            [1, 0, 0, -1, -1],
            [1, 0, 0, -1, 0, 1],
            [1, 0, 0, -1, 0, -1],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 2],
            [1, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 1, -1],
            [1, 0, 0, 0, -1],
            [1, 0, 0, 0, -2],
            [1, 0, 0, 0, -1, 1],
            [1, 0, 0, 0, -1, -1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 2],
            [1, 0, 0, 0, 0, -1],
            [1, 0, 0, 0, 0, -2],
        ] as Vector[]
        expect(actual).toEqual(expected)
    })
})
