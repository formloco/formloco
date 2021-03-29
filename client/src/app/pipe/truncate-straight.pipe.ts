import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'truncateStraight'
})
export class TruncateStraightPipe implements PipeTransform {

  transform(value: string, args: string[]): string {
    const limit = args.length > 0 ? parseInt(args[0], 10) : 20
    return value.length > limit ? value.substring(0, limit) : value
   }

}
