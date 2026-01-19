import mongoose from "mongoose";

const mongodbURL = process.env.MONGO_URI;
if (!mongodbURL) {
    throw new Error("There is an error in Db")
}

let cache = global.mongoose

if (!cache) {
    cache = global.mongoose = { connection: null, promise: null }
}

const ConnectToDB = async () => {
    if (cache.connection) {
        return cache.connection;
    }
    if (!cache.promise) {
        cache.promise = mongoose.connect(mongodbURL).then((conn) => conn.connection)
    }
    try {
        const conn = await cache.promise;
        return conn
    } catch (error:any) {
        throw new Error("ERROR in Connecting DB", error.message)
    }
}
export default ConnectToDB;