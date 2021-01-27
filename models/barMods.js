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
    barRating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    barAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    barCity: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    barState: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    barReviewLink: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    barPhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    barWebsite: {
      type: DataTypes.STRING,
      allowNull: true,
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
