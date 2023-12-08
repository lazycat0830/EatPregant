import _ from 'lodash';

class helphelp {
    formatDish = async (Dish) => {
        _.forEach(Dish, function (item) {
            item.type = item.type.trim();
            item.ingredients = item.ingredients.replace(/(\r\n)/g, '');
            item.recipe = item.recipe.replace(/(\r\n)/g, '');
            item.image = Buffer.from(item.image).toString('base64');
        });

        return Dish;
    };
}

export default new helphelp();
