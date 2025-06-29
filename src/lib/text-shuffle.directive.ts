import {
  Input,
  Directive,
} from "@angular/core"

@Directive( {

  selector: '[text], [option.color], [option.auto], [option.duration], [option.multiply]',
  standalone: true
} )
export class TextShuffleDirective {

  @Input () public text!: string

  @Input ( 'option.auto' ) public auto: boolean = false

  @Input ( 'option.color' ) public color: Array < string > = [

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
  ]

  @Input ( 'option.duration' ) public duration: number = 500

  @Input ( 'option.multiply' ) public multiply: number = 2.0
}