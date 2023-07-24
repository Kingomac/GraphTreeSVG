export default abstract class GraphNode<T> {
  public x: number = 0;
  public y: number = 0;

  constructor(public value: T) {}
}
