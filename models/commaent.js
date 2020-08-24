const {DataTypes} = require('sequelize')
// const { sequelize } = require('.') DataTypes를 중괄호({})로 쓰는 이유는 구조물이라서 그렇다

module.exports = (sequelize)=>{
    const Comment = sequelize.define("Comment", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    content: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: false,
     }
    // board_id:{
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: 'board',
    //         key: 'id'
    //     }
    // }
    }, {
        sequelize: sequelize,
        timestamps: true,
        modeIName: "Comment",
        tableName: 'comments',
        paranoid: true,
        charset: 'utf8',
        collation: 'utf8_general_ci'
    })
    Comment.associate = (db)=>{
        db.Comment.belongsTo(db.Board, {foreignKey: "boardId", targetKey:'id', as: 'Board'})
    }

return Comment;
}