declare module 'katex' {
  // TODO 怎么去写export default {}
  export function render (str: string): HTMLElement
  export function renderToString (str: string, option?: IKatexMathProps): string
  export function __parse (str: string): any
  export function __renderToDomTree (str: string): any
  export function __renderToHTMLTree (str: string): any
  export function __defineMacro (str: string, option:any): any
  type ITrust = (context: { [props: string]: string }) => boolean
  type trust = number | ITrust
  type IOutput = "html" | "mathml" | "htmlAndMathml"
  export interface IKatexMathProps {
    displayMode?: boolean
    output?: IOutput
    leqno?: boolean
    fleqn?: boolean
    throwOnError?: boolean
    macros?: object
    minRuleThickness?: number
    colorIsTextColor?: boolean
    maxSize?: number
    maxExpand?: number
    strict?: boolean
    trust?: trust
  }
}
