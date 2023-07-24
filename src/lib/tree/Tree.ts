import TreeNode from "./TreeNode";

export default class Tree<T> {
  public root?: TreeNode<T>;

  constructor({ root }: { root?: TreeNode<T> }) {
    this.root = root;
  }

  async updateParents() {
    if (this.root == undefined) throw new Error();
    await this.updateParentsRecursive(this.root);
  }

  private async updateParentsRecursive(node: TreeNode<T>) {
    for await (const child of node.children) {
      child.parent = node;
      await this.updateParentsRecursive(child);
    }
  }

  async getLeaf() {
    if (this.root == undefined) throw new Error();
    return Array.from(this.loopLeafsSync());
  }

  async *loopLeafs(): AsyncIterableIterator<TreeNode<T>> {
    if (this.root == undefined) return;
    yield* this.loopLeafsRecursive(this.root);
  }

  private async *loopLeafsRecursive(
    node: TreeNode<T>
  ): AsyncIterableIterator<TreeNode<T>> {
    if (node.children.length == 0) yield node;
    for await (const child of node.children) {
      yield* this.loopLeafsRecursive(child);
    }
  }

  *loopLeafsSync(): IterableIterator<TreeNode<T>> {
    if (this.root == undefined) return;
    yield* this.loopLeafsRecursiveSync(this.root);
  }

  private *loopLeafsRecursiveSync(
    node: TreeNode<T>
  ): IterableIterator<TreeNode<T>> {
    if (node.children.length == 0) yield node;
    for (const child of node.children) {
      yield* this.loopLeafsRecursiveSync(child);
    }
  }

  async *loopPreOrder(): AsyncIterableIterator<TreeNode<T>> {
    const node = this.root;
    if (node == undefined) return;
    yield node;
    for await (const child of node.children) {
      yield* this.loopPreOrderRecursive(child);
    }
  }
  private async *loopPreOrderRecursive(
    node: TreeNode<T> | undefined = this.root
  ): AsyncIterableIterator<TreeNode<T>> {
    if (node == undefined) return;
    yield node;
    for await (const child of node.children) {
      yield* this.loopPreOrderRecursive(child);
    }
  }

  async *loopPostOrder(): AsyncIterableIterator<TreeNode<T>> {
    const node = this.root;
    if (node == undefined) return;

    for await (const child of node.children) {
      yield* this.loopPostOrderRecursive(child);
    }

    yield node;
  }

  private async *loopPostOrderRecursive(
    node: TreeNode<T> | undefined = this.root
  ): AsyncIterableIterator<TreeNode<T>> {
    if (node == undefined) return;

    for await (const child of node.children) {
      yield* this.loopPostOrderRecursive(child);
    }

    yield node;
  }

  /**
   * Returns nodes in Inorder order. May have unexpected behaviours working with NO binary trees
   * @returns
   */
  async *loopInOrder(): AsyncIterableIterator<TreeNode<T>> {
    const node = this.root;
    if (node == undefined) return;

    for (let i = 0; i < node.children.length / 2; i++) {
      yield* this.loopInOrderRecursive(node.children[i]);
    }
    yield node;
    for (let i = node.children.length / 2; i < node.children.length; i++) {
      yield* this.loopInOrderRecursive(node.children[i]);
    }
  }

  private async *loopInOrderRecursive(
    node: TreeNode<T>
  ): AsyncIterableIterator<TreeNode<T>> {
    for (let i = 0; i < node.children.length / 2; i++) {
      yield* this.loopInOrderRecursive(node.children[i]);
    }
    yield node;
    for (let i = node.children.length / 2; i < node.children.length; i++) {
      yield* this.loopInOrderRecursive(node.children[i]);
    }
  }
}
