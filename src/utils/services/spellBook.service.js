import Api from './api';

export default class SpellBookService {

    static async get(query = {}) {
        const spellBooks = await Api.get(SpellBookService.route, query);
        return spellBooks;
    }
    
    static async post(body) {
        const response = await Api.post(SpellBookService.route, body);
        return response;
    }

    static async put(query, updates) {
        const response = await Api.put(SpellBookService.route, updates, query);
        return response;
    }
    static async delete(query) {
        const response = await Api.delete(SpellBookService.route, query);
        return response;
    }
}
SpellBookService.route = '/spellbooks';