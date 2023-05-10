const router = require('express').Router();
const { Task, User } = require('../../db/models');
// const isAuth = require('../middlewares/isAuth');
// const usersPost = require('../middlewares/usersPost');

router
  .get('/all-tasks', async (request, response) => {
    try {
      const tasks = await Task.findAll({ raw: true });
      response.json(tasks);
    } catch (error) {
      console.log(error);
      response.json({ message: 'Ошибка получения всех задач!' });
    }
  })
  .post('/new-task', async (request, response) => {
    const { title } = request.body;
    try {
      const newTask = await Task.create({ title });
      delete newTask.dataValues.createdAt;
      delete newTask.dataValues.updatedAt;
      response.json({ newTask, message: 'Новая задача была добавлена!' });
    } catch (error) {
      console.log(error);
      response.json({ message: 'Ошибка добавления новой задачи!' });
    }
  })
  .post('/task', async (request, response) => {
    const { id, title, isCompleted } = request.body;
    try {
      if (title) {
        await Task.update({ title }, { where: { id } });
        const updatedTask = await Task.findOne({ where: { id } });
        delete updatedTask.dataValues.createdAt;
        delete updatedTask.dataValues.updatedAt;
        response.json({ updatedTask, message: 'Заголовок в задаче был обновлен!' });
      } else {
        await Task.update({ isCompleted }, { where: { id } });
        const updatedTask = await Task.findOne({ where: { id } });
        delete updatedTask.dataValues.createdAt;
        delete updatedTask.dataValues.updatedAt;
        response.json({ updatedTask, message: 'Статус задачи был обновлен!' });
      }
    } catch (error) {
      console.log(error);
      response.json({ message: 'Ошибка обновления задачи!' });
    }
  })
  .delete('/task', async (request, response) => {
    const { id } = request.body;
    try {
      await Task.destroy({ where: { id } });
      response.json({ taskId: id, message: 'Задача была удалена!' });
    } catch (error) {
      console.log(error);
      response.json({ message: 'Ошибка удаления задачи!' });
    }
  });

module.exports = router;
