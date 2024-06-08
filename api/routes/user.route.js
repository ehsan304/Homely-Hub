import express from 'express'
import { checking } from '../controller/user.controller.js'

const router = express.Router()

router.get('/test', checking)

export default router