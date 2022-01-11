import { BehaviorSubject } from 'rxjs'

class ManagerService {
    currentProject = new BehaviorSubject(null)

    constructor() {
    }

    setProject(project: any) {
        this.setProject(project)
    }
}

export default new ManagerService()
