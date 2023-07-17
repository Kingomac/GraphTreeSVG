export async function setAttributes(el: Element, attr: Record<string, string>) {
    for (const clave in attr) {
        el.setAttribute(clave, attr[clave])
    }
}

export async function createElementSVG({tag, attr, children}:{ tag: string, attr?: Record<string,string>, children?: Node[]|string }) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag)
    for(const clave in attr) {
        el.setAttribute(clave, attr[clave])
    }
    if(children != undefined) {
        if(typeof children == 'string') {
            el.textContent = children
        } else {
            for await(let c of children)
                el.appendChild(c)
        }
    }
    return el
}