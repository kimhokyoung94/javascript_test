const { DataTypes } = require("sequelize");
// const { sequelize } = require('.');

module.exports = (sequelize) => {
  const Board = sequelize.define(
    "Board",
    {
      //속성 (columns, Field)
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(255), // varchar
        allowNull: false,
        unique: false,
      },
      content: {
        type: DataTypes.TEXT(),
        allowNull: false,
        unique: false,
      },
    },
    {
      sequelize: sequelize,
      timestamps: true,
      modeIName: "Board",
      tableName: "board",
      paranoid: true,
      charset: "utf8",
      collation: "utf8_general_ci",
    }
  );
  Board.associate = (db) => {
    db.Board.hasMany(db.Comment, {
      foreignKey: "boardId",
      sourceKey: "id",
      as: "commentList",
    });
  };

  Board.getBoard = async (boardId) => {
    return await Board.findOne({
      where: {
        id: boardId,
      },
    });
  };

  Board.createBoard = async (title, content) => {
    return await Board.create({
      title: title,
      content: content,
    });
  };

  Board.getAllBoard = async () => {
    return await Board.findAll();
  };

  Board.deletboard = async (boardId) => {
    return await Board.destroy({
      where: {
        id: boardId,
      },
    });
  };

  Board.updateBoard = async (boardId, title, content) => {
    return await board.update(
      {
        title: title,
        content: msContentScript,
      },
      {
        where: {
          id: boardId,
        },
      }
    );
  };

  return Board;
};
