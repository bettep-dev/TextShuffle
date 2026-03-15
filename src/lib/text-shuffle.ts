import {
  NgZone,
  Component,
  ElementRef,
  AfterViewChecked,
  ChangeDetectorRef,
  AfterViewInit,
  inject,
  effect,
  untracked,
  PLATFORM_ID
} from '@angular/core'
import { isPlatformBrowser } from '@angular/common';

import {
  TextShuffleDirective
} from './text-shuffle.directive'


@Component( {
  selector: 'text-shuffle',
  templateUrl: './text-shuffle.html',
} )
export class TextShuffleComponent extends TextShuffleDirective implements AfterViewInit, AfterViewChecked {

  private platformId = inject( PLATFORM_ID )
  private zone = inject( NgZone )
  private cdrRef = inject( ChangeDetectorRef )
  private elementRef = inject( ElementRef )

  private shuffledColor: Array < string > = []

  private changeReady = false

  private parent!: Element
  private content: any = {}
  private context!: CanvasRenderingContext2D
  private animation: any = {}
  private attribute: any
  private subscription: any

  private textEffect = effect( () => {

    const t = this.text()
    this.color()

    if ( !t || !isPlatformBrowser( this.platformId ) ) return

    untracked( () => this.setShuffle() )
  } )

  ngOnDestroy(): void {

    clearTimeout( this.animation.change )
    clearTimeout( this.animation.timeout )
    cancelAnimationFrame( this.animation.frame )

    this.animation = {}

    for ( let key in this.subscription ) this.subscription[ key ].unsubscribe()
  }

  ngAfterViewInit(): void {

    if ( !isPlatformBrowser( this.platformId ) ) return

    this.cdrRef.detach()

    this.parent = this.elementRef.nativeElement
  }

  ngAfterViewChecked(): void {

    if ( !this.text() || !isPlatformBrowser( this.platformId ) ) return

    clearTimeout( this.animation.change )

    this.animation.change = null

    this.zone.runOutsideAngular( _ => {

      if ( this.changeReady ) return

      this.cdrRef.detectChanges()

      this.animation.change = setTimeout( ( _: any ) => {

        this.changeReady = true

        this.setShuffle()

      }, 100 )
    } )
  }

  /* Get */
  /**
   * Change resolution.
   * @param size Compute size px or em
   * @param suffix Add a suffix
   * @returns
   */
  getSize( size: string, suffix ? : string ): any {

    let num = ( parseFloat( size.replace( /(px|em)/g, '' ) ) || 0 ) * this.multiply()

    if ( suffix ) return num + suffix

    return num
  }

  /**
   * Shuffle strings.
   * @param shuffle Array of letters
   * @returns
   */
  getShuffle( shuffle: Array < string > ): Array < string > {

    return shuffle.sort( _ => .5 - Math.random() )
  }

  /**
   * String to character array
   * @param char String text
   * @returns
   */
  getCharacter( char: string = this.text() ): Array < string > {

    return char.split( '' )
  }

  /**
   * Divide into words
   */
  get getWord(): Array < string > {

    return this.text().split( ' ' )
  }

  /* Set */
  /**
   * Calculate the actual size that is drawn on canvas.
   * @param character Array of letters
   * @param line
   */
  setLine( character: Array < string > , line: Array < string > = [] ) {

    for ( let char of character ) {

      line.push( char )

      var join = line.join( ' ' )

      var measure = this.context.measureText( join )

      let maximum = measure.width + ( this.attribute.letter * join.length )

      if ( this.attribute.width < maximum ) {

        if ( line.length < 2 ) {

          this.setLine( this.getCharacter( char ), line )

          continue
        }

        let pop = line.pop() !

          join = line.join( ' ' )

        line = [ pop ]

        measure = this.context.measureText( join )

        this.attribute.line.push( this.buildLineMetric( measure, join.length ) )
      }
    }

    if ( line.length > 0 ) {

      let join = line.join( ' ' )

      let measure = this.context.measureText( join )

      this.attribute.line.push( this.buildLineMetric( measure, join.length ) )
    }
  }

  private buildLineMetric( measure: TextMetrics, length: number ) {

    return {

      box: {

        ascent: measure.actualBoundingBoxAscent,
        descent: measure.actualBoundingBoxDescent
      },
      font: {

        ascent: measure.fontBoundingBoxAscent,
        descent: measure.fontBoundingBoxDescent
      },
      length
    }
  }

  /**
   * Draw text.
   */
  setText(): void {

    let lineIdx = 0

    let line = this.attribute.line[ lineIdx ]

    var l = 0

    var x = 0

    var y = line.font.ascent

    var next = () => {

      try {

        if ( line && line.length < ++l ) {

          let size = line.font.descent - line.font.ascent

          line = this.attribute.line[ ++lineIdx ]

          x = 0

          l = 0

          y = y + size + ( line.font.ascent / 2 )
        }
      } catch ( _ ) {}
    }

    this.content.suffix = this.getShuffle( this.content.suffix )

    this.context.clearRect( 0, 0, this.attribute.width, this.attribute.height )

    this.context.fillStyle = this.attribute.color

    for ( let char of this.content.prefix ) {

      let measure = this.context.measureText( char )

      this.context.fillText( char, x, y )

      x = x + ( measure.width + this.attribute.letter )

      next()
    }

    var idx = 0

    for ( let char of this.content.suffix ) {

      if ( idx >= this.shuffledColor.length ) idx = 0

      let measure = this.context.measureText( char )

      this.context.fillStyle = this.shuffledColor[ idx++ ]

      this.context.fillText( char, x, y )

      x = x + ( measure.width + this.attribute.letter )

      next()
    }
  }

  setShuffle(): void {

    try {

      this.shuffledColor = this.getShuffle( [ ...this.color() ] )

      this.content = {

        word: this.getWord,
        char: this.getCharacter(),
        prefix: this.getCharacter(),
        suffix: new Array < string > ()
      }

      var span = this.parent.querySelector( 'span' ) !

        span.textContent = this.text()

      let rect = span.getBoundingClientRect()

      let compute = window.getComputedStyle( span )

      this.attribute = {

        line: [],
        color: compute.color,
        width: rect.width * this.multiply(),
        height: rect.height * this.multiply(),
        letter: this.getSize( compute.letterSpacing )
      }

      var canvas = this.parent.querySelector( 'canvas' ) !

        canvas.width = this.attribute.width

      canvas.height = this.attribute.height

      canvas.style.width = rect.width + 'px'

      canvas.style.height = rect.height + 'px'

      canvas.style.letterSpacing = this.getSize( compute.letterSpacing, 'px' )

      this.context = canvas.getContext( '2d' ) !

        this.context.font = [ compute.fontWeight, this.getSize( compute.fontSize, 'px' ), compute.fontFamily ].join( ' ' )

      this.context.fillStyle = compute.color

      this.context.textBaseline = 'top'

      this.setLine( this.content.word )

      if ( this.auto() ) {

        this.animation.interval = this.duration() / this.text().length

        return this.onEnter()
      }

      this.setText()

    } catch {}
  }

  /**
   * Mouse event
   */
  onEnter(): void {

    if ( !this.changeReady ) return

    this.content = {

      word: this.getWord,
      char: this.getCharacter(),
      prefix: new Array < string > (),
      suffix: this.getCharacter()
    }

    this.animation.interval = this.animation.interval || this.duration() / this.text().length

    this.animation.frame = window.requestAnimationFrame( _ => this.onUpdate() )

    this.onTimer()
  }

  onLeave(): void {

    if ( !this.changeReady ) return

    this.content.prefix = this.getCharacter()

    this.content.suffix = new Array < string > ()

    window.cancelAnimationFrame( this.animation.frame )

    clearTimeout( this.animation.timeout )

    this.context.clearRect( 0, 0, this.attribute.width, this.attribute.height )

    this.setText()
  }

  onTimer(): void {

    this.animation.timeout = setTimeout( ( _: any ) => {

      let char = this.content.char.shift()

      this.content.prefix.push( char )

      this.content.suffix.splice( this.content.suffix.indexOf( char ), 1 )

      if ( this.content.char.length > 0 ) {

        this.onTimer()

      } else {

        this.onLeave()
      }
    }, this.animation.interval )
  }

  onUpdate(): void {

    this.animation.frame = window.requestAnimationFrame( _ => this.onUpdate() )

    this.setText()
  }
}