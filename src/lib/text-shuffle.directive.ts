import {
  Directive,
  input,
} from "@angular/core"

@Directive( {

  selector: '[text], [option.color], [option.auto], [option.duration], [option.multiply]',
} )
export class TextShuffleDirective {

  public text = input.required<string>()

  public auto = input<boolean>( false, { alias: 'option.auto' } )

  public color = input<Array < string >>( [

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
  ], { alias: 'option.color' } )

  public duration = input<number>( 500, { alias: 'option.duration' } )

  public multiply = input<number>( 2.0, { alias: 'option.multiply' } )
}