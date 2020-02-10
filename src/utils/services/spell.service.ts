import Api from "./api";
export default class SpellService extends Api {
    route = "/spells";
    async getSpells(query = {}) {
        const spells = await this.get(this.route, query);
        return spells;
    }

}