export const LessonModel = (sequelize, Sequelize) => {
    const Lesson = sequelize.define("lesson", {
      name: {
        type: Sequelize.STRING,
      },
      org_id: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE
      }
    });
    return Lesson;
  };