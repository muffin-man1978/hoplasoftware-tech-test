import mongoose from "mongoose";
import mongodbConfig from "../mongodb.config";

// Singleton
export default class MongoDBConnection {

    private static instance: MongoDBConnection;
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

    public close() : void {
        mongoose.connection.close();
    }

}