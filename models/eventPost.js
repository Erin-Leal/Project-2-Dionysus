module.exports = function (sequelize, DataTypes) {
  const EventPost = sequelize.define("EventPost", {
    event: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1],
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1],
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1],
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1],
    },
  });

  EventPost.associate = function (models) {
    // We're saying that a Post should belong to an User
    // A Post can't be created without an User due to the foreign key constraint
    EventPost.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return EventPost;
};
