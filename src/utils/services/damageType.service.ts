import Api from "./api";
export default class DamageTypeService extends Api {
    route = "/damageTypes";
    async getDamageTypes(query = {}) {
        const damageTypes = await this.get(this.route, query);
        return damageTypes;
    }

}