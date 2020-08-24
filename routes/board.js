const express = require("express");
const router = express.Router();
// const Board = require('../models/board');

const createError = require("http-errors");
const Model = require("../models");
const sequelize = Model.sequelize;
const Board = Model.Board;
const Comment = Model.Comment;
/**
 * GET: boardList
 */
router.get("/", async function (req, res, next) {
  // const [rows, fields] = await Board.getBoardList();
  const rows = await Board.getAllBoard();
  console.log(rows);

  res.render("board/boardList", { boardList: rows });
});
//   console.log(boardList);
//   res.render(
//     "board/boardList",
//     { boardList: boardList }

/**
 * GET: BoardWrite
 */
router.get("/write", function (req, res, next) {
  res.render("board/boardWrite");
});

/**
 * GET: BoardDetail
 */
router.get("/:id", async function (req, res, next) {
  const boardId = parseInt(req.params.id);
  const board = await Board.findOne({
    include: ["commetList"],
    where: {
      id: boardId,
    },
  });
  console.log(board);
  if (board === null) {
    next(createError(404));
  }
  res.render("board/boardDetail", { board: board });
});

/**
 * POST: boardWrite
 */
router.post("/", async function (req, res, next) {
  const { title, content, author } = req.body;
  const result = await Board.createBoard(title, content);
  // const board = await Board.createBoard(title, content, author);
  res.redirect("/board");
});

/**
 * POST: boardDelete
 */
router.post("/:id/delete", async function (req, res, next) {
  const boardId = parseInt(req.params.id);
  const result = await Board.deleteBoard(boardId);
  res.redirect("/board");
});

/**
 * 수정 구현하기
 * 1. 수정할 수 있는 Form 만들기(Rendering)
 *    1. GET요청 -> render(board/boardEdit.njk)
 * 2. [1]에서 만든 Form 요청을 받은 router.post('/board/:id/edit') 정의.
 *    1. router.post 만들기.  (params:id, req.body: title, content, author)
 *    2. models/board에 editBoard 함수 만들고 router에서 호출하기
 *    3. response 만들어서 주기
 */
/**
 * GET: boardEdit
 */
router.get("/:id/edit", async function (req, res, next) {
  const boardId = parseInt(req.params.id);
  const board = await Board.getBoardDetail(boardId);
  console.log(board);

  res.render("board/boardEdit", { board: board });
});

/** 2. [1]에서 만든 Form 요청을 받은 router.post('/board/:id/edit') 정의.
 *    1. router.post 만들기.  (params:id, req.body: title, content, author)
 *    2. models/board에 editBoard 함수 만들고 router에서 호출하기
 *    3. response 만들어서 주기
 */
/**
 * POST: boardEdit
 */
router.post("/:id/edit", async function (req, res, next) {
  const boardId = parseInt(req.params.id);
  const { title, content, author } = req.body;
  const board = await Board.updateBoard(boardId, title, content);

  res.render("board/boardEdit", { board: board });
});

router.post("/:id/comment", async (req, res, next) => {
  console.log("요청 받음");
  const { comment } = req.body;
  if (comment) {
    const result = await Comment.create({
      boardId: req.params.id,
      content: comment,
    });

    console.log(result);
    res.json(result);
  } else {
    res.status(404);
    res.send("comment를 입력해 주세요.");
  }
});

module.exports = router;
