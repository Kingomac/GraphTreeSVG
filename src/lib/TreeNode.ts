import INode from "./INode"
import { setAttributes } from "./util"

export default class TreeNode extends INode {

    constructor(children: TreeNode[], text: string) {
        super(children, text)
    }

}