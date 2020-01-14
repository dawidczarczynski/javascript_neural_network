import Matrix from './matrix'

class LayerLink {

    constructor(prevNode_count, node_count) {
        this.weights = new Matrix(node_count, prevNode_count);
        this.bias = new Matrix(node_count, 1);
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
