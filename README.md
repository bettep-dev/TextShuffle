## TextShuffle Angular Library.

A library that randomly mixes input strings and outputs them from the front digit.

You can check out the demo <a href="https://bettep.org/text-shuffle">here</a>.

![Excute](https://raw.githubusercontent.com/Hongdaesik/TextShuffle/master/DEMO.gif)

<br><br>

## Installation

```bash
npm install --save text-shuffle 
```

<br><br>

## Usage

```typescript
import {
  FormsModule
} from '@angular/forms'
import {
  CommonModule
} from '@angular/common'

import {
  TextShuffleModule or TextShuffleComponent
} from 'text-shuffle'

@Component( {

  imports: [

    FormsModule,
    CommonModule,

    TextShuffleModule or TextShuffleComponent
  ],
  standalone: true,
  selector: 'app-my-component',
  template: '<text-shuffle [text]="text" [option.auto]="option.auto" [option.color]="option.color" [option.duration]="option.duration" [option.multiply]="option.multiply"></text-shuffle>'
} )
export class MyComponent {

  public color: string

  /* Optional */
  this.palette = [ { code: '#ffffff', name: 'White' } ... ]

  /* require */
  public text: string = 'TextShuffle, Put your mouse pointer here!'

  /* optional */
  public option: any = {

    auto: true,
    color: [

      '#ff3100',
      '#ff8000',
      '#ffc600',
      '#88ff00',
      '#00ff71',
      '#00e8ff',
      '#0084ff',
      '#3100ff',
      '#ff00e1',
      '#ff003e',
      '#e6e6e6',
      '#808080',
      '#333333'
    ],
    duration: 500,
    multiply: 2.0
  }
}
```

<br><br>

## Parameter
|Name|Type|Description|Default|
|---|---|---|---|
|[text]|string|String to output.|"''"|
|[option.auto]|boolean|Whether the shuffle animation is automatic.|`true`|
|[option.color]|Array|Text transformation color.|`['#ff3100','#ff8000','#ffc600','#88ff00','#00ff71','#00e8ff','#0084ff','#3100ff''#ff00e1','#ff003e','#e6e6e6','#808080','#333333']`|
|[option.duration]|number|Time of animation operation.|500|
|[option.multiply]|number|Size scale drawn on the canvas.|2.0|

<br><br>

## Change Log

`1.0.0` : Initial release.
`1.0.4` : Change demo address.
`2.0.0` : Remove package dependency.
`2.0.1` : Standalone / SSR compatible.

<br><br>

## License

MIT

<br><br>

## Other programs

<https://bettep.org>