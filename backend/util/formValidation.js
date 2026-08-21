import {z} from 'zod'





const jokeSchema = z.object({
    id: z.number('Enter a number').int().min(1, {message: 'Must be greater than 0'})
})


export default jokeSchema