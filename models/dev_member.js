const Sequelize = require('sequelize');

class Dev_member extends Sequelize.Model {
    static initiate(sequelize) {
        Dev_member.init({
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
            department: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            motivation: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            project_description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            portfolio_pdf: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            github_profile: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            github_email: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            slack_email: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            willing_general_member: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: true,
            modelName: 'Dev_member',
            tableName: 'dev_members',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
}

module.exports = Dev_member;