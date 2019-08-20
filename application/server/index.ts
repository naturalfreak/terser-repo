import { isMaster, fork, on } from 'cluster';
import { container } from '../../decorators';
import { Loader } from './loader';

if (isMaster) {

    fork();
    console.log('Master cluster started');

    on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died, code ${code}, signal ${signal}`);
        fork();
    });

} else {

    container.resolve(Loader);

}
