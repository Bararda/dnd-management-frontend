import Api from './api';

export default class SpellBookSpellService {

    static async get(query = {}) {
        const spellBookSpells = await Api.get(SpellBookSpellService.route, query);
        return spellBookSpells;
    }

    static async post(body) {
        const spellBooks = await Api.post(SpellBookSpellService.route, body);
        return spellBooks;
    }
    
}
SpellBookSpellService.route = '/spellbookspells';