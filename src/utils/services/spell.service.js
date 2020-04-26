import Api from './api';

export default class SpellService {

    static async getSpells(query = {}) {
        const spells = await Api.get(SpellService.route, query);
        return spells;
    }
}
SpellService.route = '/spells';