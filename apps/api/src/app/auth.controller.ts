import { Router } from 'express';
import axios from 'axios'
const router = Router()

router.post('/login', (req, res) => {
    const code: string = req.body.code;
    console.log('CLIENT ID : ', process.env.NX_GITHUB_CLIENT_ID)
    console.log('CLIENT SECRET : ', process.env.NX_GITHUB_SECRET)
    axios.post('https://github.com/login/oauth/access_token', {
        client_id: process.env.NX_GITHUB_CLIENT_ID,
        client_secret: process.env.NX_GITHUB_SECRET,
        code,
    }, { headers: { 'Accept': 'application/json' }}).then((response) => {
        res.send(response.data)
    }).catch((error) => {
        console.log(error)
        res.send(error.message)
    })
})

router.post('/postest', (req, res) => {
    return res.send('tested')
})

router.get('/test', (req, res) => res.send('test'))

export default router