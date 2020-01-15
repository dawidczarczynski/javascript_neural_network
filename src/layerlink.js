import Matrix from './matrix'

class LayerLink {

    constructor(previousLayerNeurons, neurons) {
        this.weights = new Matrix(neurons, previousLayerNeurons);
        this.bias = new Matrix(neurons, 1);
        this.weights.randomize();
        this.bias.randomize();
    }

    updateWeights(weights) {
        this.weights = weights;
    }

    getWeights() {
        return this.weights;
    }

    getBias() {
        return this.bias;
    }
    
    add(deltaWeight, bias) {
        this.weights.add(deltaWeight);
        this.bias.add(bias);
    }

}

export default LayerLink
