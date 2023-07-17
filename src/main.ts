import TreeDocument from './lib/TreeDocument'
import TreeNode from './lib/TreeNode'
import './style.css'

document.addEventListener('DOMContentLoaded', async () => {
    const tree = new TreeDocument(new TreeNode([
        new TreeNode([
            new TreeNode([], "skain"),
            new TreeNode([], "puto"),
            new TreeNode([], "calvo")
        ], "hijo1"),
        new TreeNode([], "hijo2")
    ], "uwu"))
    const el = await tree.buildSvg()
    document.getElementById('app')?.append(el)
})
