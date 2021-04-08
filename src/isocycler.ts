import {Duration, El, Er, Index, Norm, Pun, Vector} from "./types"

// https://math.stackexchange.com/questions/793856/standard-notation-for-sum-of-vector-elements
// https://en.wikipedia.org/wiki/Norm_(mathematics)#_norm_or_Manhattan_norm
const computeVectorNorm = (vector: Vector): Norm => {
    return vector.reduce(
        (norm: Norm, element: El) => {
            return norm + Math.abs(element) as Norm
        },
        0 as Norm,
    )
}

const computeVectorEr = (vector: Vector, durations: Duration[]): Er => {
    return vector.reduce(
        (er: Er, el: El, index: number) => {
            return er + el * durations[index] as Er
        },
        0 as Er,
    )
}

const isFirstNonzeroElPositive = (vector: Vector): boolean => {
    for (const el of vector) {
        if (el < 0) return false
        if (el > 0) return true
    }
    return false
}

const invertVector = (vector: Vector): Vector => {
    return vector.map((el: El) => -el as El)
}

const computeIncrementedVectorPuns = (puns: Pun[], vector: Vector, durations: Duration[], maxNorm: Norm, maxEr: Er, index: Index, increment: number) => {
    const newVector = [...vector]
    newVector[index] = newVector[index] + increment as El
    computeVectorPuns(puns, newVector, durations, maxNorm, maxEr, index)
}

const computeVectorPuns = (puns: Pun[], vector: Vector, durations: Duration[], maxNorm: Norm, maxEr: Er, initialIndex: Index = 0 as Index) => {
    let norm = computeVectorNorm(vector)
    if (norm > maxNorm) {
        return
    }

    const er = computeVectorEr(vector, durations)
    if (Math.abs(er) < maxEr && isFirstNonzeroElPositive(vector)) {
        if (er > 0) {
            puns.push([vector, er])
        } else {
            puns.push([invertVector(vector), -er as Er])
        }
    }

    for (let index = initialIndex; index < vector.length; index++) {
        if (vector[index] === 0) {
            // Kick it off in both directions
            computeIncrementedVectorPuns(puns, vector, durations, maxNorm, maxEr, index, 1)
            computeIncrementedVectorPuns(puns, vector, durations, maxNorm, maxEr, index, -1)
        } else if (vector[index] > 0) {
            // Continue in positive direction
            computeIncrementedVectorPuns(puns, vector, durations, maxNorm, maxEr, index, 1)
        } else {
            // Continue in negative direction
            computeIncrementedVectorPuns(puns, vector, durations, maxNorm, maxEr, index, -1)
        }
    }
}

const formatPuns = (puns: Pun[]): string => {
    return puns.reduce(
        (punOutput: string, pun: Pun): string => {
            return punOutput + pun[0].toString() + ": " + pun[1] + "\n"
        },
        "",
    )
}

const sortPunsByEr = (puns: Pun[]): void => {
    puns.sort((a: Pun, b: Pun) => a[1] - b[1])
}

const computePuns = (durations: Duration[], maxNorm: Norm = 5 as Norm, maxEr: Er = 0.001 as Er) => {
    const puns = [] as Pun[]
    const initialVector = durations.map(_ => 0 as El)

    computeVectorPuns(puns, initialVector, durations, maxNorm, maxEr)

    sortPunsByEr(puns)

    return formatPuns(puns)
}

export {
    computePuns,
}

// TODO: Would be cool if you could also check JI pitches up to a certain odd limit or something (including e.g. 3/2)
//  Or really, it should just be able to take an arbitrary scale (.scl file) and use its pitches as the building block
//  (Or equivalently a set of durations, a duration scale, if you're thinking like that)
//  Or select from a set of obvious common choices, like 12-EDO, a harmonic mode

// TODO: And also begin to set it up for success with if you give it for an input an arbitrary target (besides 1)
//  Meaning that it should always start out pre-populated with a list of puns you can achieve with the unit
//  Or rather, all the vector combinations of the notes in the scale, I mean (assuming the bottom one is the unit)
//  But you may also select any sequence of notes you're trying to redo or supplement and it should find puns for it

// TODO: Add tests that this thing is as efficient as possible

// TODO: the error should actually be proportionate with the duration of the thing it's an error for
//  So if it's a tiny error over 7 bars or something, that's a huge deal, but a borderline big error on 1 bar, maybe no

// TODO: plug in @musical-patterns/material to perform it (or however houndstoothtopia does it)
//  The default timbre should probably have a weak-ish attack to help cover up the inexact onsets

// TODO: it can generate sheet music through Lilypond or something, with normal staff notation & squares supplement

// TODO: it should be able to compose some generative music as some of a way of demonstrating the energy

// TODO: visual interface where you can:
//  - Add a new voice with a + symbol in the next row
//   Horizontal scroll, for when they get inevitably long? yeah it's just shift and scroll wheel, so that should be fine
//  - There's a line across the top with tick marks and faint lines down for the units
//  - Where no filled squares yet, empty or dotted-line squares the size of entire unit or remainder thereof
//   Do them as SVGs, because I think that will work best for exporting for performance scores
//  - You can select a sequence of existing squares or empty-squares, then the bank of possibilities updates w/r/t it
//  - You should be able to click in the bank of possibilities to populate the score with some squares
//  - Every voice's blank space should be sliced up by any other voice's boundaries, so you can always fit to any voice
//  - Click the left edge of a square and drag to left to shift everything to the left while making it bigger
//   And similarly click the right edge of a square and drag to the right to make it bigger shifting things to right
//   If you instead want to just apportion space differently between two neighbor squares, maybe ctrl+drag?
//  - Might want to be able to ctrl+C ctrl+V copy paste squares around
//  - Maybe it should highlight in red borders any squares that aren't the size of ones in your scale
//  - What would the bank of possibilities look like? thumbnails of the squares you'd drag in? with some exact numbers?
//   Snap points in vertical scroll for the bank which would be on the left column,
//   to show how each pun aligns with the selection it’s a pun with (which is frozen at the top)
//  - Could consider applying a spectrum of colors to the squares to help at a glance discern the pitch
//   That'd be one of a small set of checkbox options, to enable spectral coloration
//  - Along with whether you allow the results to include results that simpler divisions could do
//   (like the vector could be divided by 2? No do that by default...
//   I mean like would be possible in 13-EDO but you’re looking at 26-EDO, if that’s possible,
//   like look at new results this edo contributes to the field)

// TODO: perhaps a feature to snap something exactly to a unit bar, or whatever else

// TODO: inputs and locking feature
//  like there could be one input for the root Hz
//  one input for the tempo
//  and then another for the cycle count
//  and maybe initially the cycle count would be a randomish number
//  whatever results from the formula of Hz combineed with tempo
//      but if you type in a new cycle count
//  and you haven't locked Hz or the tempo
//  then both would try to change proportionally to suit your new cycle count
//  or maybe it's simpler
//  if you're just forced to have one of the three locked at all times
//  yeah it would never make sense to have two locked ever

// TODO: thoughts on how to distribute the error here: https://app.asana.com/0/530392539241382/1200147391481332
