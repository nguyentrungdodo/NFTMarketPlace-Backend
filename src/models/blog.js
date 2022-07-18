const modelBlog = (sequelize, Datatypes) => {
    const blog = sequelize.define(
      "blog",
      {
        id: {
          type: Datatypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        title:{
          type: Datatypes.STRING(255),
          allowNull: false,
        },
        description:{
          type: Datatypes.TEXT,
          allowNull: false,
        },
        image:{
          type:Datatypes.TEXT,
          allowNull: false,
        },
      },
      {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
    return blog;
  };
  module.exports = modelBlog;
  