import Tree from "./lib/tree/Tree";
import TreeNode from "./lib/tree/TreeNode";

export async function parseTree<T>(input: string) {
  const text = input
    .split(/\r?\n/)
    .map((i) => i.trim())
    .filter((i) => i != "")
    .join("");
  console.log("trimmed string", text);
  let char = 0;
  let level = 0;
  const lastOnLevel: TreeNode<string>[] = [];
  while (char < text.length) {
    let str = "";
    while (!/[\:\[\]\,]/.test(text.charAt(char))) {
      str += text.charAt(char);
      char++;
    }
    console.log("read str", str, "and found token", text.charAt(char));
    if (text.charAt(char) == ":") {
      if (text.charAt(char + 1) != "[") throw new Error();
      lastOnLevel[level] = new TreeNode<string>({ value: str });
      if (level - 1 >= 0 && lastOnLevel[level - 1] != undefined)
        lastOnLevel[level - 1].children.push(lastOnLevel[level]);
      char++;
      level++;
    }
    if (text.charAt(char) == ",") {
      lastOnLevel[level - 1].children.push(
        new TreeNode<string>({ value: str })
      );
    }
    if (text.charAt(char) == "]") {
      if (str != "") {
        lastOnLevel[level - 1].children.push(
          new TreeNode<string>({ value: str })
        );
      }
      level--;
      if (text.charAt(char + 1) == ",") char++;
    }
    char++;
  }

  console.log("lastOnLevel", lastOnLevel);
  return new Tree<string>({ root: lastOnLevel[0] });
}
