import Api from './api';

export default class SchoolService {

    static async getSchools(query = {}) {
        const schools = await Api.get(SchoolService.route, query);
        return schools;
    }

}
SchoolService.route = '/schools';