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
  return Bar;
};
