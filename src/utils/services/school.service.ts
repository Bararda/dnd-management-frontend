import Api from "./api";
export default class SchoolService extends Api {
    route = "/schools";
    async getSchools(query = {}) {
        const schools = await this.get(this.route, query);
        return schools;
    }

}