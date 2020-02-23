import Api from "./api";
export default class ComponentTypeService extends Api {
    route = "/componentTypes";
    async getComponentTypes(query = {}) {
        const componentTypes = await this.get(this.route, query);
        return componentTypes;
    }

}