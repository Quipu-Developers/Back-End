const {DataTypes} = require('sequelize');
const Sequelize = require("sequelize");
class Event_participant extends Sequelize.Model {
    static initiate(sequelize) {
        Event_participant.init(
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
                student_id: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                winning: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                },
                goods: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                kakao_id: {
                    type: DataTypes.STRING,
                    allowNull: true,
                }
            },
            {
                sequelize,
                timestamps: true,
                underscored: true,
                modelName: "Event_participant",
                tableName: "event_participants",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci",
            }
        );
    }
}

module.exports = Event_participant;
