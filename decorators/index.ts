import { DependencyContainer } from './types';
import { injectable, singleton, inject, autoInjectable } from './decorators';
import { instance } from './dependency-container';

const container: DependencyContainer = instance;

export { injectable, singleton, inject, autoInjectable, container };

