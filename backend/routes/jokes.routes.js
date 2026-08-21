import express, { Router } from 'express'
import jokes from "../models/jokes.js";
import {findJoke, addJoke, deleteJoke, updateJoke} from '../controller/jokes.controller.js'

const router = Router()

router.get('/', (req, res) => {
    res.status(200).json({
      jokes,
      status: 200,
      ok: true
    });
})

router.get("/find-joke/:id", findJoke)

router.post("/add-joke", addJoke)

router.delete('/delete-joke/:id', deleteJoke)


router.put("/update-joke/:id", updateJoke);


export default router
