# `enhance-mathquill-edit`

## Usage

```
const enhanceMathQuillEdit = require('enhance-mathquill-edit');

// or

import enhanceMathQuillEdit from 'enhance-mathquill-edit'
```

## API props

| field   | mathExpression | handleInputExpression | edit | getMq | traverseOpts | style |
| :---:   | :------------: | :-------------------: | :--: | :---: | :----------: | :---: |
| type    | string         | function | boolean | function | object | object |
| example |  `2+3=`        | `handleInputExpression(mathField.latex(), mathField)` | true | `(mq) => void` | `{JSXElement () {}}` | `{padding: 0 0}`|
| isNeed  |  true      |  true | true | true | false | false |
