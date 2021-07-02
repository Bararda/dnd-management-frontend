import Api from './api';

export default class ClassService {
    
    static async get(query = {}) {
        const classes = await Api.get(ClassService.route, query);
        return classes;
    }

}
ClassService.route = '/classes';
