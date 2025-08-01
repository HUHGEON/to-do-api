const express = require('express');
const router = express.Router();

let todos = [];
let nextId = 1;

// CREATE: 할일 추가
router.post('/', (req, res) => {
  try {
    const { title, description } = req.body;
    
    // 빈제목 방지
    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "제목을 적어주세요."
      });
    }
    
    // 제목 길이 20자로 제한
    if (title.length > 20) {
      return res.status(400).json({
        success: false,
        message: "제목을 20자 이내로 작성해주세요."
      });
    }
    
    // 설명 길이 20자로 제한
    if (description && description.trim().length > 100) {
      return res.status(400).json({
        success: false,
        message: "설명을 100자 이내로 작성해주세요."
      });
    }
    
    const newTodo = {
      id: nextId++,
      title: title,
      description: description ? description : '',
      completed: '미완료',
      created_at: new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })
    };
    
    todos.push(newTodo);
    
    res.status(201).json({
      success: true,
      data: newTodo
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "서버 오류가 발생했습니다."
    });
  }
});

// READ: 할일 목록 조회
router.get('/', (req, res) => {
  try {
    res.json({
      count: todos.length,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "할일 목록을 가져오는 중 오류가 발생했습니다."
    });
  }
});

// UPDATE: 할일 완료 상태 변경
router.put('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "해당 할일을 찾을 수 없습니다."
      });
    }
    
    todos[todoIndex].completed = todos[todoIndex].completed === '미완료' ? '완료' : '미완료';
    
    res.json({
      success: true,
      message: "할일 상태가 변경되었습니다.",
      data: todos[todoIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "할일 상태 변경 중 오류가 발생했습니다."
    });
  }
});

// DELETE: 할일 삭제
router.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "해당 할일을 찾을 수 없습니다."
      });
    }
    
    const deletedTodo = todos.splice(todoIndex, 1)[0];
    
    res.json({
      success: true,
      message: "할일이 삭제되었습니다.",
      data: deletedTodo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "할일 삭제 중 오류가 발생했습니다."
    });
  }
});

module.exports = router;