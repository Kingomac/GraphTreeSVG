import Tree from "./tree/Tree";
import TreeNode from "./tree/TreeNode";
import { createElementSVG } from "./util";

export default class TreeDocument<T> {
  constructor(private tree: Tree<T>) {}

  async buildSvg() {
    if (this.tree.root == undefined) throw new Error();

    await this.calculateInitialPosition();
    await this.centerParents();

    return await this.makeDraw();
  }

  private async makeDraw() {
    const elems: Promise<SVGElement>[] = [];
    for await (const node of this.tree.loopPreOrder()) {
      elems.push(node.buildSvg());
    }
    const result = await Promise.all(elems);
    return await createElementSVG({
      tag: "svg",
      attr: {
        viewBox: "0 0 400 400",
      },
      children: result,
    });
  }

  async centerParents() {
    console.log("leafs:", await this.tree.getLeaf());
    const parents = (await this.tree.getLeaf()).map((i) => {
      if (i.parent != undefined) return i.parent;
    }) as TreeNode<T>[];
    await this.centerParentsRecursive(...parents);
  }

  private async centerParentsRecursive(...parents: TreeNode<T>[]) {
    const newparents = [];
    for (const parent of parents) {
      let min = Number.MAX_VALUE;
      let max = Number.MIN_VALUE;
      for (const child of parent.children) {
        if (child.x < min) min = child.x;
        if (child.x > max) max = child.x;
      }
      console.log("set", parent.value, "x", (max + min) / 2);
      parent.x = (max + min) / 2;
      if (parent.parent != undefined) newparents.push(parent.parent);
    }
    if (newparents.length > 0) await this.centerParentsRecursive(...newparents);
  }

  private async calculateInitialPosition() {
    if (this.tree.root == undefined) return;
    let nodes = [this.tree.root];
    let level = 1; // y position
    while (nodes.length > 0) {
      let x = 0;
      const newnodes: TreeNode<T>[] = [];
      for (const node of nodes) {
        node.y = level;
        node.x = x;
        x++;
        newnodes.push(...node.children);
      }
      level++;
      nodes = newnodes;
    }
  }
}
