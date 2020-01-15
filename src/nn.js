
import Matrix from './matrix'
import LayerLink from './layerlink'

class NeuralNetwork {

    constructor(layers, options = {}) {
        if (layers.length < 2) throw new Error("Neural network needs at least 2 layers")

        this.options = {
            activation: x => 1 / (1 + Math.exp(-x)),
            derivative: y => y * (1 - y),
            learningRate: options.learningRate || 0.1
        }

        this.layersNumber = layers.length - 1
        this.inputs = layers[0]
        this.outputs = layers[layers.length - 1]

        this.layerLink = layers
            .map((layer, index, array) => {
                const prevLayerNeurons = layer
                const currLayerNeurons = array[index + 1]
                
                if (!currLayerNeurons)
                    return null 

                if (currLayerNeurons <= 0)
                    throw new Error("Layer should have at least one neuron")

                return new LayerLink(prevLayerNeurons, currLayerNeurons)
            })
            .filter(Boolean)
    }

    predict(inputs) {
        if (inputs.length !== this.inputs) 
            throw new Error(`Number of inputs expected: ${this.inputs}, given: ${inputs.length}.`)

        const layerResult = this.layerLink.reduce((previousWeights, layer) => {
            const weights = layer.getWeights()
            const bias = layer.getBias()

            const next = Matrix.multiply(weights, previousWeights)
            next.add(bias)
            next.map(this.options.activation)

            return next
        }, Matrix.fromArray(inputs))

        return layerResult.toArray()
    }

    train(inputs, targets) {
        if (inputs.length !== this.inputs)
            throw Error(`Number of inputs expected: ${this.inputs}, given: ${inputs.length}.`)

        if (targets.length !== this.outputs)
            throw Error(`Number of outputs expected: ${this.outputs}, given: ${targets.length}.`)

        const layerResults = this.layerLink.reduce((results, layer) => {
            const weights = layer.getWeights()
            const bias = layer.getBias()
            const previousResult = results[results.length - 1]

            const result = Matrix.multiply(weights, previousResult)
                result.add(bias)
                result.map(this.options.activation)

            return [ ...results, result]
        }, [Matrix.fromArray(inputs)])

        const targetsMatrix = Matrix.fromArray(targets);
        const layerErrors = [];

        // Calculate error based on target
        layerErrors[this.layersNumber] = Matrix.subtract(targetsMatrix, layerResults[this.layersNumber]);

        // Recalculating error for each Layer
        for (let i = this.layersNumber; i > 0; i--) {
            const layerResult = layerResults[i]
            const layerError = layerErrors[i]
            const layerLink = this.layerLink[i - 1]
            const prevLayerResult = layerResults[i - 1]

            // Calculate layer gradient 
            // dyE/dyW = learning_rate * layerError * sigmoid(x) * (1-sigmoid(x)); 
            // NOTE: dsigmoid = sigmoid(x) * (1-sigmoid(x) ie derivative of sigmoid
            const gradient = Matrix.map(layerResult, this.options.derivative)
                  gradient.multiply(layerError)
                  gradient.multiply(this.options.learningRate)

            // Calculate weights changes
            const hiddenT = Matrix.transpose(prevLayerResult);
            const weightHoDeltas = Matrix.multiply(gradient, hiddenT);

            // Update the Weights and Gradient According to Deltas & Gradient.
            layerLink.add(weightHoDeltas, gradient);

            // Calculate the Previous Layer Errors (Proportional Error based on Current Layer Error.)
            // NOTE: We are Backpropogating, Therefore we are going backwards 1 step (i.e. i-1)
            layerErrors[i - 1] = Matrix.multiply(
                Matrix.transpose(layerLink.getWeights()),
                layerError
            );
        }
    }
    
}

export default NeuralNetwork