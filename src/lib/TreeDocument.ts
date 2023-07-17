import { SvgDocument } from "./SvgDocument";
import TreeNode from "./TreeNode";
import { createElementSVG, setAttributes } from "./util";

export default class TreeDocument extends SvgDocument<TreeNode> {

    private readonly COL_WIDTH = 50;
    private readonly DRAW_SIZE_X = 400
    private readonly DRAW_SIZE_Y = 400
    private readonly MARGIN = 10

    constructor(rootNode: TreeNode) {
        super(rootNode);
        
    }


    async buildSvg() {
        if(this.parentNode == undefined) throw new Error()
        
        const width = await this.getWidth() // number of columns
        const docWidth = width * this.COL_WIDTH
        console.log(`Document width: ${width} cols: ${docWidth}`)
        const draw = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
        draw.setAttribute('viewBox', `0 0 ${this.DRAW_SIZE_X} ${this.DRAW_SIZE_Y}`)
        let row: TreeNode[] = [this.parentNode]
        let i = 0
        let x = 50 // starting at (10,10)
        let y = this.MARGIN
        while(row.length > 0) {
            let newrow: TreeNode[] = []
            console.log("BUCLE*** " + i)
            console.log(row.length)
            const xInc = 100/(row.length+1)
            console.log("length+1: " + (row.length+1).toString())
            console.log(xInc)
            x = xInc
            for await(let i of row) {
                const textEl = await createElementSVG({
                    tag: 'text',
                    attr: {
                        fill: 'black',
                        x: `${x}%`,
                        y: y.toString()
                    },
                    children: i.text
                }) as SVGTextContentElement
                draw.append(textEl)

                newrow.push.apply(newrow, i.children)
                x += xInc
            }
            row = newrow
            y += this.COL_WIDTH
            i++
        }

        return draw
    }

    async getWidth() {
        if(this.parentNode == undefined) throw new Error()
        let width = 0
        let row = [this.parentNode]
        while(row.length > 0) {
            if(row.length > width)
                width = row.length
            const newrow: TreeNode[] = []
            for await(let r of row) {
                newrow.push.apply(newrow, r.children)
            }
            row = newrow
        }
        return width
    }
}