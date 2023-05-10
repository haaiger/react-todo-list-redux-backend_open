const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Task extends Model {
    static associate(models) {
      // Task.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  Task.init(
    {
      title: {
        type: DataTypes.STRING,
      },
      isCompleted: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: 'Task',
    },
  );

  return Task;
};
