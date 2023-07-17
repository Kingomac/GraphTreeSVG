export abstract class SvgDocument<T> {
    
    constructor(protected parentNode: T | undefined = undefined) {
        
        
    }

    abstract buildSvg(): Promise<SVGElement>
    
}