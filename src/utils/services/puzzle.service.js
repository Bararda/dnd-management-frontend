import Api from './api';

export default class PuzzleService {
    
    static async getRunePuzzleStatus(query = {}) {
        return Api.get(`${PuzzleService.route}/runes`, query);
	}
	
	static async updatePuzzleStatus(query = {}, updates = {}) {
        return Api.put(`${PuzzleService.route}/runes`, updates, query);
    }

    static async resetPuzzle(query = {}, updates = {}) {
        return Api.delete(`${PuzzleService.route}/runes`, updates, query);
    }
}
PuzzleService.route = '/puzzles';
