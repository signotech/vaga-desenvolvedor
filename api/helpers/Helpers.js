export default class Helpers {
    static formatFilters(filters) {
        const newFilters = { ...filters };
        for(const filter in newFilters) {
            if(!newFilters[filter]) {
                delete newFilters[filter];
            } else {
                newFilters[filter] = `${newFilters[filter]}` 
            }
        }
        return newFilters;
    }

}