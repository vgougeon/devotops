import axios from 'axios';
import { BehaviorSubject, from, of, Subject } from 'rxjs'
import { distinctUntilChanged, filter, map, skipWhile, switchMap, takeWhile, tap } from 'rxjs/operators'

class AuthService {
    code = new Subject<string>();
    token = new Subject<string>();
    user = new BehaviorSubject<any>(null)

    constructor() {
        this.code.pipe(distinctUntilChanged(), filter(v => !!v)).subscribe(code => {
            axios.post('/api/login', { code }).then((response) => {
                this.token.next(response.data.access_token)
            })
        })

        this.token.pipe(distinctUntilChanged(), filter(v => !!v)).subscribe(token => {
            axios.post('https://api.github.com/user', null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                this.user.next(response.data)
            })
        })
    }

    setCode(code: string) {
        this.code.next(code)
    }
}

export default new AuthService()
