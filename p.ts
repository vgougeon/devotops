import { BehaviorSubject, interval, of, Subject } from 'rxjs'
import { distinctUntilChanged, filter } from 'rxjs/operators'

const value = new Subject<string>()
const user = new Subject<string>()
const userInfo = new Subject<string>()

value.pipe(
    distinctUntilChanged(),
    filter(val => !!val)
).subscribe((val) => {
    console.log('GET USER')
    user.next('User N' + val)
})

user.pipe(
    distinctUntilChanged(),
    filter(val => !!val)
).subscribe((val) => {
    userInfo.next('Info de ' + val)
})

userInfo.subscribe(console.log)

interval(1000).subscribe(() => value.next('1'))
