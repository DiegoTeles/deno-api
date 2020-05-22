import "https://deno.land/x/dotenv/load.ts";
import { init, MongoClient } from "https://deno.land/x/mongo@v0.6.0/mod.ts";

// @ts-ignore
await init();

const dbName = Deno.env.get('DATABASE_NAME') || "deno";
const dbURI = Deno.env.get('DATABASE_HOST') || "mongodb://localhost:27017";

class DataBase {
  public client: MongoClient;
  constructor(
    public dbName: string,
    public url: string
  ) {
    this.dbName = dbName;
    this.url = url;
    this.client = {} as MongoClient;;
  }

  connect() {
    const client = new MongoClient();
    client.connectWithUri(this.url);
    this.client = client;
  }

  get findDatabase() {
    return this.client.database(this.dbName)
  }
}

const connectionDatabase = new DataBase(dbName, dbURI);
connectionDatabase.connect()

export default connectionDatabase;
