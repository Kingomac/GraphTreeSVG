import GraphNode from "../general/GraphNode";
import { createElementSVG } from "../util";

export default class TreeNode<T> extends GraphNode<T> {
  public children: TreeNode<T>[];
  public parent: TreeNode<T> | undefined;
  /**
   * X axis displacement to avoid overlapping
   */
  public mod: number = 0;

  constructor({
    parent,
    children,
    value,
  }: {
    parent?: TreeNode<T>;
    children?: TreeNode<T>[];
    value: T;
  }) {
    super(value);
    this.children = children || [];
    this.parent = parent;
  }

  async isLeftMost() {
    if (this.parent == undefined) return true;
    return this.parent.children[0] == this;
  }

  async getPreviousSibling() {
    if (this.parent == undefined) throw new Error();
    return this.parent.children[this.parent.children.indexOf(this) - 1];
  }

  async getNextSibling() {
    if (this.parent == undefined) throw new Error();
    return this.parent.children[this.parent.children.indexOf(this) + 1];
  }

  async buildSvg() {
    return await createElementSVG({
      tag: "text",
      attr: {
        x: ((this.x + this.mod) * 30).toString(),
        y: (this.y * 30).toString(),
      },
      children: String(this.value).toString(),
    });
  }
}
