import { worker } from 'cluster';
import { injectable } from '../../decorators';
import { Database } from '../providers';

@injectable()

export class Loader {

    constructor(
        private Database: Database
    ) {
        this.Database
            .listen()
            .then(() => {
                console.log('Init database');
            })
            .catch((error: Error) => {
                setTimeout(() => {
                    worker.destroy();
                }, 10 * 1000);
                throw error;
            });
    }

}
