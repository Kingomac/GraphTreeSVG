export default abstract class INode {

    constructor(public children: INode[], public text: string) {

    }
    

    async append(c: INode): Promise<void> {
        this.children.push(c)
    }

}