const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize'); // Sequelize 인스턴스를 가져옴

class quipu extends Model {
    // 스태틱 메서드를 사용하여 모델 초기화
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    autoIncrement: true
                },
                newold: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false
                },
                name: {
                    type: DataTypes.STRING(20),
                    allowNull: false
                },
                school_number: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    unique: true
                },
                major: {
                    type: DataTypes.STRING(20),
                    allowNull: false
                },
                phone_number: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                motive: {
                    type: DataTypes.TEXT,
                    allowNull: true
                },
                time: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW
                }
            },
            {
                // 테이블 및 모델 설정
                sequelize,
                modelName: 'quipu', // 모델 이름
                tableName: 'quipu', // 실제 데이터베이스 테이블 이름
                timestamps: false, // createdAt, updatedAt 자동 생성하지 않음
                underscored: false, // 카멜 케이스 대신 스네이크 케이스 사용하지 않음
                paranoid: false, //삭제 시간 저장 x
                charset: 'utf8', // 캐릭터 셋
                collate: 'utf8_general_ci', // 콜레이션
            }
        );
    }
    //static associate(db) {}   //다른 db와 연관 x
}

module.exports = quipu; // 모델 내보내기
