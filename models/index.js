const User = require('./User');
const Item = require('./item');
const Favorite = require('./favorite');

User.hasMany(Item, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

Item.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

User.hasMany(Favorite, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

Favorite.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

module.exports = { User, Item, Favorite };
