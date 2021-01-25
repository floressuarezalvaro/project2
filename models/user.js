module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Bar, {
      onDelete: "cascade",
    });
  };

  return User;
};
