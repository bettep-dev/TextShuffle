import {
  NgModule
} from '@angular/core'
import {
  FormsModule
} from '@angular/forms'
import {
  CommonModule
} from '@angular/common'

import {
  TextShuffleComponent
} from './text-shuffle'

@NgModule( {
  imports: [

    FormsModule,
    CommonModule,

    TextShuffleComponent
  ],
  exports: [
    TextShuffleComponent
  ]
} )
export class TextShuffleModule {}
