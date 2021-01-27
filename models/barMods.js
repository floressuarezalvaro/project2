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
