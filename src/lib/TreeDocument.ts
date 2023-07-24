import { SvgDocument } from "./SvgDocument";
import Tree from "./tree/Tree";
import TreeNode from "./tree/TreeNode";
import { createElementSVG, setAttributes } from "./util";

export default class TreeDocument<T> {
  private readonly COL_WIDTH = 50;
  private readonly DRAW_SIZE_X = 400;
  private readonly DRAW_SIZE_Y = 400;
  private readonly MARGIN = 10;

  constructor(private tree: Tree<T>) {}

  async buildSvg() {
    if (this.tree.root == undefined) throw new Error();

    // Calculate initial X
    await this.calculateInitialX();
    await this.calculateInitialY();
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

  private async calculateInitialY() {
    if (this.tree.root == undefined) throw new Error();
    let y = 1;
    let nodes = [this.tree.root];
    while (nodes.length > 0) {
      const newnodes = [];
      for await (const node of nodes) {
        node.y = y;
        newnodes.push(...node.children);
      }
      y++;
      nodes = newnodes;
    }
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

  private async calculateInitialX() {
    for await (const node of this.tree.loopPostOrder()) {
      console.log("calculating X of", node.value);
      if (!(await node.isLeftMost())) {
        node.x = (await node.getPreviousSibling()).x + 1;
        console.log("prev sibling", await node.getPreviousSibling());
      } else {
        node.x = 0;
      }
      console.log("is", node.x);
    }
  }
}
