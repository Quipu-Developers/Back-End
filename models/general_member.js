/*
const { DataTypes, Model } = require('sequelize');

class General_member extends Model {}

// 모델 정의
General_member.init({
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
        unique: true,
    },
    major: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    motivation: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize: null, // 나중에 index.js에서 설정됩니다
    modelName: 'General_member',
    tableName: 'general_members',
    timestamps: true,
    underscored: true,
    paranoid: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
});

module.exports = General_member;
*/

const Sequelize = require('sequelize');
class General_member extends Sequelize.Model {
    static initiate(sequelize) {
        General_member.init({
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            student_id: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            major: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            phone_number: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            motivation: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: 'General_member',
            tableName: 'general_members',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
}

module.exports = General_member;