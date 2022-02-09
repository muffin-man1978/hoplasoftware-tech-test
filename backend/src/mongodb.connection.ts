import mongoose from "mongoose";
import applicationConfig from "../application.config";

// Singleton
export default class MongoDBConnection {

    private static instance: MongoDBConnection;
    private _connection : any;

    public constructor() {   
        try {     
            mongoose.connect(applicationConfig.mongoDB.connectionString).then((conn) => {
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