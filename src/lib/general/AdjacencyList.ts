export default class AdjacencyList<T> {
  private nodes: Set<T> = new Set();
  private edges: Map<T, Set<T>> = new Map();

  async addEdge(origin: T, ...destiny: T[]) {
    let destList = this.edges.get(origin);
    if (destList == undefined) {
      this.nodes.add(origin);
      destList = new Set();
      this.edges.set(origin, destList);
    }
    for await (let i of destiny) {
      destList.add(i);
      this.nodes.add(i);
    }
  }

  async getDestinies(origin: T) {
    return this.edges.get(origin);
  }

  async getNodes() {
    return this.nodes;
  }
}
