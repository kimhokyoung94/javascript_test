const { PayloadTooLarge } = require("http-errors");

let Board = [
  {
    id: 1,
    title: "게시글1",
    content: '내용1',
    author: '신윤수',
    createdAt: '2020-08-19 12:00:00'
  },
  {
    id: 2,
    title: "게시글2",
    content: '내용2',
    author: '신윤수',
    createdAt: '2020-08-19 12:00:00'
  },
  {
    id: 3,
    title: "게시글3",
    content: '내용3',
    author: '신윤수',
    createdAt: '2020-08-19 12:00:00'
  }
]

let autoId = Board.length;



module.exports = {
  getBoardList: () => {
    return Board;
  },
  getBoardDetail: (boardId) => {
    let board = null;
    for (let _board of Board) {
      if (_board.id === boardId) {
        board = _board;
      }
    }
    return board;
  },
  createBoard: function (title, content, author) {
    const query = "CREATE FROM board WHERE id=?"
    // Board = Board.concat([{
      // id: autoId,
      // title: title,
      // content: content,
      // author: author,
      // createdAt: new Date().getTime()
    }]);
    autoId++;
    return Board;
  },
  deleteBoard: function (boardId) {
    const query = "DELETE FROM board WHERE id=?"
    const [result, fields] = await PayloadTooLarge.query(query,
        [boardId]
        );
    // Board = Board.filter((board) => {
    //   return board.id !== boardId
  return  [result, fields]
  },

  editBoard: function (boardId, title, content, author) {
    const query = "UPDATE board SET title=?, content=? WHERE id=?"
    // Board = Board.map((board) => {
    //   if (board.id === boardId) {
    //     return {
    //       ...board,
    //       title: title,
    //       content: content,
    //       author: author
        }
      }
      return board
    });
  }
}