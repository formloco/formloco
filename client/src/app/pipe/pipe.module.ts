import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TruncatePipe } from './truncate.pipe'
import { TruncateStraightPipe } from './truncate-straight.pipe'
import { ReplaceUnderscorePipe } from './replace-underscore.pipe'

@NgModule({
  declarations: [
    TruncatePipe,
    TruncateStraightPipe,
    ReplaceUnderscorePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TruncatePipe,
    TruncateStraightPipe,
    ReplaceUnderscorePipe
  ]
})
export class PipeModule { }
