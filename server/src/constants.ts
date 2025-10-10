import * as process from "node:process";

export const jwtSecret = process.env.JWT_SECRET ?? "local"