import { Router } from 'express';
import db from '../db/db';
import User from '../db/models/user.model';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';
const router = Router()

router.get('/users', async (req, res) => {
    res.send(await User.query())
})

router.post('/projects', async (req, res) => {
    const [id] = await db('projects').insert({
        name: req.body.project.name,
        template: req.body.template,
        githubId: req.body.project.owner.id,
        url: req.body.project.clone_url,
    }, "*")

    const project = await db('projects').where({ id }).first()

    try {
        axios.post('http://localhost/worker/start-container', {
            url: project.url,
            id: project.id,
            template: project.template
        }).then(() => {
            console.log("PROJECT STARTED", project.id, project.template)
        }).catch(() => { console.log('no worker')})

        return res.send(project)
    }
    catch {
        return res.status(404).send('Worker offline')
    }


})

router.get('/projects', async (req, res) => {
    const token = req.headers['authorization']
    console.log(token)
    const payload = jwt.verify(token, 'SECRET') as any
    console.log(payload)

    const project = await db('projects').where({ githubId: payload.githubId })

    return res.send(project)
})

router.get('/projects/:id', async (req, res) => {
    console.log(req.params.id)
    const project = await db('projects').where({ id: req.params.id }).first()
    if (!project) return res.status(404)

    try {
        const status = await axios.post('http://localhost/worker/project-status', { id: req.params.id }).catch(err => console.log(err))
        res.send(status)
    }
    catch {
        res.status(404).send('Worker offline')
    }
})
export default router