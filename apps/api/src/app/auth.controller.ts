import { Router } from 'express';
import axios from 'axios'
import db from '../db/db';
import * as jwt from 'jsonwebtoken';
const router = Router()

router.post('/login', (req, res) => {
    const code: string = req.body.code;
    console.log('CLIENT ID : ', process.env.NX_GITHUB_CLIENT_ID)
    console.log('CLIENT SECRET : ', process.env.NX_GITHUB_SECRET)
    axios.post('https://github.com/login/oauth/access_token', {
        client_id: process.env.NX_GITHUB_CLIENT_ID,
        client_secret: process.env.NX_GITHUB_SECRET,
        code,
    }, { headers: { 'Accept': 'application/json' } }).then(async (response) => {
        const user = await axios.post('https://api.github.com/user', null, {
            headers: {
                'Authorization': `Bearer ${response.data.access_token}`
            }
        })
        let dbUser = await db('users').where({ githubId: user.data.id }).first()
        if (!dbUser) {
            const [id] = await db('users').insert({
                githubId: user.data.id,
                username: user.data.login,
                name: user.data.name,
                avatar: user.data.avatar_url,
            })
            dbUser = await db('users').where({ githubId: user.data.id }).first()
        }
        
        const appToken = jwt.sign({ githubId: dbUser.githubId }, 'SECRET')

        res.send({
            user: user.data,
            appToken,
            token: response.data.access_token
        })
    }).catch((error) => {
        console.log(error)
        res.send(error.message)
    })
})

router.get('/me', (req, res) => {
    const token = req.body.token

    // console.log(response.data)
    // let user = await db('users').where({ githubId: response.data.id })
    // if(!user) user = await db('users').insert({
    //     githubId: response.data.id,
    //     username: response.data.login,
    //     name: response.data.name,
    //     avatar: response.data.avatar_url,
    // })
})

router.post('/postest', (req, res) => {
    return res.send('tested')
})

router.get('/test', (req, res) => res.send('test'))

export default router