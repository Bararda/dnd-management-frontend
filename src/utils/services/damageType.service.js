import Api from './api';

export default class DamageTypeService {
    
    static async getDamageTypes(query = {}) {
        const damageTypes = await Api.get(DamageTypeService.route, query);
        return damageTypes;
    }

}
DamageTypeService.route = '/damageTypes';