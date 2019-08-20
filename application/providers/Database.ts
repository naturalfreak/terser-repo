import { MongoClient, Db, Collection } from 'mongodb';
import { singleton } from '../../decorators';

@singleton()

export class Database {

  private db: Db;

  constructor() { }

  async listen(): Promise<Db> {

    const url = `mongodb+srv://test:test@database-ys3cz.mongodb.net/test?retryWrites=true&w=majority`;

    return MongoClient.connect(url, { useNewUrlParser: true }).then((client: MongoClient) => {
      this.db = client.db('test');
      return this.db;
    });

  }

  setCollection(name: string): Collection {

    if (this.db) {
      return this.db.collection(name);
    }

    throw new Error('Database not initialized.');

  }

}
