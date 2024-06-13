import express from 'express'
import { checking, deleteUser, updateUser, getUserListings } from '../controller/user.controller.js'
import { verifyToken } from '../utils/verifyToken.js'

const router = express.Router()

router.get('/test', checking)
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/listings/:id',verifyToken, getUserListings)

export default router