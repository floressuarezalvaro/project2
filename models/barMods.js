module.exports = (sequelize, DataTypes) => {
  const GET = sequelize.define("GET", {
    barName: {
      type: DataTypes.TEXT,
      allowNull: false,
      //   validate: {
      //     len: [1],
      //   },
      defaultValue: sequelize.NOW,
    },
  });
  return GET;
};
