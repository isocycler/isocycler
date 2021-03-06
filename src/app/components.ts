import {stop} from "@musical-patterns/material"
import {
    DEFAULT_EDO,
    DEFAULT_PERIODS,
    DEFAULT_MAX_NORM,
    DEFAULT_MAX_UNPUNNINESS,
    DEFAULT_ET, DEFAULT_LOOP,
} from "./constants"
import {components, guiState} from "./globals"
import {handlePunsChange} from "./handlers"

const buildEdoSpinnerWrapper = (): HTMLDivElement => {
    const edoWrapper: HTMLDivElement = document.createElement("div")

    const edoInput: HTMLInputElement = document.createElement("input")
    edoInput.type = "number"
    edoInput.value = DEFAULT_EDO.toString()
    edoInput.addEventListener("change", handlePunsChange)

    const edoLabel = document.createElement("label")
    edoLabel.textContent = "EDO"

    edoWrapper.appendChild(edoLabel)
    edoWrapper.appendChild(edoInput)

    components.edoInput = edoInput

    return edoWrapper
}

const buildMaxNormSpinnerWrapper = (): HTMLDivElement => {
    const maxNormWrapper: HTMLDivElement = document.createElement("div")

    const maxNormInput: HTMLInputElement = document.createElement("input")
    maxNormInput.type = "number"
    maxNormInput.value = DEFAULT_MAX_NORM.toString()
    maxNormInput.addEventListener("change", handlePunsChange)

    const maxNormLabel = document.createElement("label")
    maxNormLabel.textContent = "max norm"

    maxNormWrapper.appendChild(maxNormLabel)
    maxNormWrapper.appendChild(maxNormInput)

    components.maxNormInput = maxNormInput

    return maxNormWrapper
}

const buildMaxUnpunninessSpinnerWrapper = (): HTMLDivElement => {
    const maxUnpunninessWrapper: HTMLDivElement = document.createElement("div")

    const maxUnpunninessInput: HTMLInputElement = document.createElement("input")
    maxUnpunninessInput.type = "number"
    maxUnpunninessInput.value = DEFAULT_MAX_UNPUNNINESS.toString()
    maxUnpunninessInput.step = "0.1"
    maxUnpunninessInput.min = "0"
    maxUnpunninessInput.max = "500"
    maxUnpunninessInput.addEventListener("change", handlePunsChange)

    const maxUnpunninessLabel = document.createElement("label")
    maxUnpunninessLabel.textContent = "max unpunniness"

    maxUnpunninessWrapper.appendChild(maxUnpunninessLabel)
    maxUnpunninessWrapper.appendChild(maxUnpunninessInput)

    components.maxUnpunninessInput = maxUnpunninessInput

    return maxUnpunninessWrapper
}

const buildPeriodsSpinnerWrapper = (): HTMLDivElement => {
    const periodsWrapper: HTMLDivElement = document.createElement("div")

    const periodsInput: HTMLInputElement = document.createElement("input")
    periodsInput.type = "number"
    periodsInput.value = DEFAULT_PERIODS.toString()
    periodsInput.min = "1"
    periodsInput.max = "6"
    periodsInput.addEventListener("change", handlePunsChange)

    const periodsLabel = document.createElement("label")
    periodsLabel.textContent = "periods"

    periodsWrapper.appendChild(periodsLabel)
    periodsWrapper.appendChild(periodsInput)

    components.periodsInput = periodsInput

    return periodsWrapper
}

const buildEtCheckboxWrapper = (): HTMLDivElement => {
    const etWrapper: HTMLDivElement = document.createElement("div")

    const etCheckbox: HTMLInputElement = document.createElement("input")
    etCheckbox.type = "checkbox"
    etCheckbox.checked = DEFAULT_ET
    etCheckbox.addEventListener("change", handlePunsChange)

    const etLabel = document.createElement("label")
    etLabel.textContent = "is equal tempered"

    etWrapper.appendChild(etLabel)
    etWrapper.appendChild(etCheckbox)

    components.etCheckbox = etCheckbox

    return etWrapper
}

const buildResultsDiv = (): HTMLDivElement => {
    const results: HTMLDivElement = document.createElement("div")

    components.results = results

    return results
}

const buildLoopCheckboxAndStopButtonWrapper = (): HTMLDivElement => {
    const loopWrapper: HTMLDivElement = document.createElement("div")

    const loopCheckbox: HTMLInputElement = document.createElement("input")
    loopCheckbox.type = "checkbox"
    loopCheckbox.checked = DEFAULT_LOOP
    loopCheckbox.addEventListener("change", () => {
        guiState.loop = !guiState.loop
        if (guiState.loop) {
            components.stopButton.style.visibility = "visible"
        } else {
            components.stopButton.style.visibility = "hidden"
            stop().then()
        }
    })

    const loopLabel = document.createElement("label")
    loopLabel.textContent = "loop"

    components.loopCheckbox = loopCheckbox

    const stopButton = document.createElement("button")
    stopButton.textContent = "stop"
    stopButton.style.visibility = "hidden"

    stopButton.addEventListener("click", () => {
        stop().then()
    })

    components.stopButton = stopButton

    loopWrapper.appendChild(loopLabel)
    loopWrapper.appendChild(loopCheckbox)
    loopWrapper.appendChild(stopButton)

    return loopWrapper
}

export {
    buildEdoSpinnerWrapper,
    buildMaxNormSpinnerWrapper,
    buildMaxUnpunninessSpinnerWrapper,
    buildPeriodsSpinnerWrapper,
    buildEtCheckboxWrapper,
    buildResultsDiv,
    buildLoopCheckboxAndStopButtonWrapper,
}
