import {
    CompilePatternParameters,
    Entity,
    Material,
    MaterializeEntities,
    MaterializeScales,
    Note,
    play,
    Scale,
    Scales,
    setPattern,
    setupPerformer,
    stop,
    TimbreNameEnum,
} from "@musical-patterns/material"
import {
    Cardinal,
    Duration as UtilitiesDuration,
    Intensity,
    Pitch,
    Scalar,
    Tone,
    Value,
} from "@musical-patterns/utilities"
import {Pun} from "../puns"
import {Count, Duration} from "../puns/types"
import {guiState} from "./globals"

const setupAudio = async () => {
    await setupPerformer()
}

const playPun = async ([vector]: Pun, durations: Duration[]) => {
    await stop()

    const upperNotes: Note[] = []
    const lowerNotes: Note[] = []
    vector.forEach((count: Count, vectorIndex: number) => {
        const duration = durations[vectorIndex]

        if (count > 0) {
            for (let index = 0; index < count; index++) {
                upperNotes.push({
                    pitch: {scalar: 1 / duration as unknown as Scalar<Pitch>},
                    value: {scalar: duration as unknown as Scalar<Value>},
                    envelope: {scalar: 0.97 * duration as unknown as Scalar<Value>},
                    intensity: {scalar: 0.5 as unknown as Scalar<Intensity>},
                })
            }
        } else if (count < 0) {
            for (let index = 0; index < -count; index++) {
                lowerNotes.push({
                    pitch: {scalar: 1 / duration as unknown as Scalar<Pitch>},
                    value: {scalar: duration as unknown as Scalar<Value>},
                    envelope: {scalar: 0.97 * duration as unknown as Scalar<Value>},
                    intensity: {scalar: 0.5 as unknown as Scalar<Intensity>},
                })
            }
        }
    })

    const upperEntity: Entity = {
        sections: [
            {
                notes: upperNotes,
                repetitions: guiState.loop ? undefined : 1 as unknown as Cardinal,
            },
        ],
        timbreName: TimbreNameEnum.WARM_TRIANGLE,
    }
    const lowerEntity: Entity = {
        sections: [
            {
                notes: lowerNotes,
                repetitions: guiState.loop ? undefined : 1 as unknown as Cardinal,
            },
        ],
        timbreName: TimbreNameEnum.WARM_TRIANGLE,
    }
    const materializeEntities: MaterializeEntities = () => [upperEntity, lowerEntity]

    const pitchScale: Scale<Pitch> = {basis: 220 as unknown as Tone}
    const valueScale: Scale<Value> = {basis: 1000 as unknown as UtilitiesDuration}
    const scales: Scales = {PITCH: [pitchScale], VALUE: [valueScale]}
    // const pitchScale: Scale<Pitch> = {
    //     basis: 440 as unknown as Tone,
    //     scalars: [1, 2, 3] as unknown[] as Array<Scalar<Pitch>>,
    // }
    // const valueScale: Scale<Value> = {
    //     basis: 100 as unknown as Duration,
    //     scalars: [1, 2, 3] as unknown[] as Array<Scalar<Value>>,
    // }
    const materializeScales: MaterializeScales = () => scales

    const material: Material = {materializeEntities, materializeScales}
    const compilePatternParameters: CompilePatternParameters = {material}
    await setPattern(compilePatternParameters)
    play()
}

export {
    setupAudio,
    playPun,
}
