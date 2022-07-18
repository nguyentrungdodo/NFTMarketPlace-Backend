const modelUser = (sequelize, Datatypes) => {
    const media = sequelize.define(
      "role",
      {
        id: {
          type: Datatypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Datatypes.TEXT,
          allowNull: false,
        },
      },
      {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
    return media;
  };
  module.exports = modelUser;
  
  