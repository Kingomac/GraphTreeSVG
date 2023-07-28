import { parseTree } from "./TreeParser";
import TreeDocument from "./lib/TreeDocument";
import Tree from "./lib/tree/Tree";
import TreeNode from "./lib/tree/TreeNode";
import "./style.css";

document.addEventListener("DOMContentLoaded", async () => {
  (document.getElementById("tree-btn") as HTMLButtonElement).onclick =
    async () => {
      console.log("xdd");
      const tree = await parseTree(
        (document.getElementById("tree-input") as HTMLTextAreaElement).value
      );
      await tree.updateParents();
      const doc = new TreeDocument<string>(tree);
      document.body.append(await doc.buildSvg());
      for await (const level of tree.loopLevelsTopBottom()) {
        console.log("level:", level.level, "nodes:", level.nodes);
      }
    };
});
