import { Subject } from 'rxjs'
import { tag } from 'rxjs-spy/operator/tag'

import { setNumbers } from '../../state/numbers'
import { createNumbersArrOfLength } from '../../utils/createNumbersArrOfLength'

// Create useCase stream
const setLengthOfNumbers$ = tag.call(new Subject<number>(), 'useCases/numbers/setLength')

// Write business logic and specify DI
const _setLengthOfNumbers = (
  di: {
    setLengthOfNumbers$: typeof setLengthOfNumbers$,
    setNumbers: typeof setNumbers
  }
) => {
  di.setLengthOfNumbers$
    .map(createNumbersArrOfLength)
    .do(di.setNumbers)
    .subscribe()

  return (n: number) => di.setLengthOfNumbers$.next(n)
}

// Initialize
// The initialization can be in separate file, to prevent side effects during units tests
export const setLengthOfNumbers = _setLengthOfNumbers({ setLengthOfNumbers$, setNumbers })