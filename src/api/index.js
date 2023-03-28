import authApi from './auth-api';

export { authApi };

export class Connection {
    static init(store) {
        let con = new Connection(store);
        window.connection = con;
    }

    constructor(store) {
        this._store = store
    }
}
