import axios from 'axios';
import { BehaviorSubject, from, Observable, of, Subject } from 'rxjs'
import { distinctUntilChanged, filter, map, mergeMap, skipWhile, switchMap, takeWhile, tap } from 'rxjs/operators'

class AuthService {
    code = new BehaviorSubject<string>('');
    token = new BehaviorSubject<string>('');
    user = new BehaviorSubject<any>(null)

    projects = new BehaviorSubject<any[]>([])

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

    getProjects() {
        if(!this.user.value) return
        axios.get(this.user.value.repos_url, {
            headers: {
                'Authorization': `Bearer ${this.token.value}`
            }
        }).then(response => {
            this.projects.next(response.data)
        })
    }
}

export default new AuthService()
