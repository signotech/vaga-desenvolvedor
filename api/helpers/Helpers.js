const { Op } = require('sequelize');

module.exports = class Helpers {
    static formatFilters(filters) {
        const newFilters = { ...filters };
        for(const filter in newFilters) {
            if(!newFilters[filter]) {
                delete newFilters[filter];
            } else {
                newFilters[filter] = {
                    [Op.like]: `${newFilters[filter]}%`
                } 
            }
        }
        return newFilters;
    }

}