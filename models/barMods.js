module.exports = (sequelize, DataTypes) => {
  const Bar = sequelize.define("Bar", {
    barName: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1],
      },
      defaultValue: sequelize.NOW,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Bar.associate = (models) => {
    Bar.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Bar;
};
