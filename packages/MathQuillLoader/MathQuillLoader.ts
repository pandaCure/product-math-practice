import './style/mathquill.scss'
type Direction = 0 | 1
export interface MathFieldReturn {
  revert(): void
  reflow(): void
  el(): HTMLElement
  latex(): string
  latex(latexString: string): void
  focus(): void
  blur(): void
  write(latex: string): void
  cmd(latexString: string): void
  select(): void
  clearSelection(): void
  moveToLeftEnd(): void
  moveToRightEnd(): void
  keystroke(keys: string): void
  typedText(text: string): void
  config(newConfig: IMathFieldConfig): void
}
export interface IMathFieldConfig {
  spaceBehavesLikeTab?: boolean
  leftRightIntoCmdGoes?: 'up' | 'down'
  restrictMismatchedBrackets?: boolean
  sumStartsWithNEquals?: boolean
  supSubsRequireOperand?: boolean
  charsThatBreakOutOfSupSub?: string
  autoSubscriptNumerals?: boolean
  autoCommands?: string
  autoOperatorNames?: string
  substituteTextarea?: () => void
  handlers?: {
    deleteOutOf?: (direction: Direction, mathField: MathFieldReturn) => void
    moveOutOf?: (direction: Direction, mathField: MathFieldReturn) => void
    selectOutOf?: (direction: Direction, mathField: MathFieldReturn) => void
    downOutOf?: (mathField: MathFieldReturn) => void
    upOutOf?: (mathField: MathFieldReturn) => void
    edit?: (mathField: MathFieldReturn) => void
    enter?: (mathField: MathFieldReturn) => void
  }
}
export interface IMathQuill {
  getInterface: (num: number) => any
  MathField(div: HTMLElement, config?: IMathFieldConfig): MathFieldReturn
}
// eslint-disable-next-line @typescript-eslint/no-require-imports
export const MathQuill: IMathQuill = require('exports-loader?window.MathQuill!imports-loader?window.jQuery=jquery!@edtr-io/mathquill/build/mathquill.js')
export const MQ = MathQuill.getInterface(2)
