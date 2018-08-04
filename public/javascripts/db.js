const DB_NAME = 'hackoverflow'
const DB_URL = `mongodb://localhost:27017/${DB_NAME}`;

class HackoverflowDB{

    constructor() {
      this.db = axios.create({
        baseURL: DB_URL
      });
    }

}