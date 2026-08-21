import dotenv from "dotenv";

dotenv.config()

const env = {
    port: process.env.port || 5555,

}

export default env