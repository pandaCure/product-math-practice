declare module 'react-latex' {
  export default class Latex extends React.Component<IProps & any, any> {}
  interface IProps {
    [props:string]:any
  }
}