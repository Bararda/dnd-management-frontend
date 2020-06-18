import Api from './api';

export default class SpellBookSpellService {

    static async get(query = {}) {
        const spellBookSpells = await Api.get(SpellBookSpellService.route, query);
        return spellBookSpells;
    }

    static async post(body) {
        const insertID = await Api.post(SpellBookSpellService.route, body);
        return insertID;
    }
    
    static async delete(query) {
        const affectedRows = await Api.delete(SpellBookSpellService.route, query);
        return affectedRows;
    }

}
SpellBookSpellService.route = '/spellbookspells';