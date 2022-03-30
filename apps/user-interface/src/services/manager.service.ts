import axios from 'axios'
import { BehaviorSubject } from 'rxjs'
import authService from './auth.service'

class ManagerService {
    currentProject = new BehaviorSubject<any>(null)
    status = new BehaviorSubject<any>(null)

    constructor() {
        this.currentProject.subscribe(project => this.loop())

        setInterval(this.loop.bind(this), 500)
    }

    loop() {
        if (this.currentProject.value) {
            axios.get('/api/projects/' + this.currentProject.value.id).then(res => this.status.next(this.parseStatus(res.data.cmd)))
                .catch(err => {
                    this.status.next(this.parseStatus("2ea485e0d00b_1-_0.00%_ERROR / 1.904GiB_0.13%_80/tcp -> 0.0.0.0:10000\n"))
                })
        }
    }

    parseStatus(status: string) {
        const s = status.split('_')
        console.log(s)
        return {
            containerId: s[0],
            id: s[1],
            cpuPerc: s[2],
            memUsage: s[3],
            memPerc: s[4],
            port: s[5],
        }
    }

    setProject(project: any) {
        this.currentProject.next(project)
    }

    addProject(projectName: any, template: any) {
        console.log(authService.projects.value)
        const project = authService.projects.value.find(p => p.name === projectName)
        if (project) {
            axios.post('/api/projects', { project, template }, {
                headers: { 'Authorization': authService.appToken.value }
            })
                .then(res => {
                    this.currentProject.next(res.data)
                })
        }
    }
}

export default new ManagerService()
