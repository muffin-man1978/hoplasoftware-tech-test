import mongoose from "mongoose";
import { connection } from "mongoose";
import mongodbConfig from "../mongodb.config";

// Singleton connection pattern
export default class MongoDBConnection {

    private static instance: MongoDBConnection;    
    // private _connection : Promise<connec
    private _connection : any;

    public constructor() {   
        try {     
            mongoose.connect(mongodbConfig.connectionString).then((conn) => {
                this._connection = conn;
            });
        } catch (e) {
            throw e;
        }
    }

    public static getInstance() : MongoDBConnection {        
        if(!MongoDBConnection.instance) {            
            MongoDBConnection.instance = new MongoDBConnection();
        }
        return MongoDBConnection.instance;
    }

    public getConnection() : Promise<typeof mongoose> {
        return this._connection;
    }

    public async close() : Promise<void> {
        await this._connection.close();
    }

}