const {DataTypes} = require('sequelize');
const Sequelize = require("sequelize");
class Event_goods extends Sequelize.Model {
    static initiate(sequelize) {
        Event_goods.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                count: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                }
            },
            {
                sequelize,
                timestamps: false,
                underscored: true,
                modelName: "Event_goods",
                tableName: "event_goods",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }
}

module.exports = Event_goods;
