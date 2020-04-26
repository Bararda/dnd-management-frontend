import Api from './api';

export default class ComponentTypeService {
    
    static async getComponentTypes(query = {}) {
        const componentTypes = await Api.get(ComponentTypeService.route, query);
        return componentTypes;
    }

}
ComponentTypeService.route = '/componentTypes';
