import TreeDocument from "./lib/TreeDocument";
import Tree from "./lib/tree/Tree";
import TreeNode from "./lib/tree/TreeNode";
import "./style.css";

document.addEventListener("DOMContentLoaded", async () => {
  const tree = new Tree({
    root: new TreeNode<number>({
      children: [
        new TreeNode<number>({
          value: 1,
          children: [
            new TreeNode<number>({ value: 3 }),
            new TreeNode<number>({ value: 4 }),
            new TreeNode<number>({ value: 5 }),
          ],
        }),
        new TreeNode<number>({
          value: 2,
          children: [
            new TreeNode<number>({ value: 6 }),
            new TreeNode<number>({ value: 7 }),
            new TreeNode<number>({ value: 8 }),
          ],
        }),
      ],
      value: 0,
    }),
  });
  await tree.updateParents();
  const doc = new TreeDocument<number>(tree);
  document.body.append(await doc.buildSvg());
});
