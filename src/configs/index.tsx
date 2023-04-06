/** config for debug */
// const config = {
//   host: 'http://192.168.246.50:3001',
// };

/** config for VPS */
const config = {
host: 'http://103.162.31.84:3003',
};

const API_HOST = config.host;

const TIMEOUT = 1 * 60 * 1000;

const StoreAppId = {};

export {TIMEOUT, StoreAppId, API_HOST};

export default config;
