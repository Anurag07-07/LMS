import { Redis } from "ioredis";
import dotenv from 'dotenv';
dotenv.config();
const REDIS_URI = process.env.REDIS_URI;
if (!REDIS_URI) {
    throw new Error("Fatal Error: REDIS_URI environment variable is not set.");
}
export const redisClient = new Redis(REDIS_URI);
redisClient.on('connect', () => {
    console.log("Ioredis client Connected Successfully to Redis server.");
});
//# sourceMappingURL=redis.js.map