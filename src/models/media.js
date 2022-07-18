const modelMedia = (sequelize, Datatypes) => {
  const media = sequelize.define(
    "media",
    {
      id: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name:{
        type: Datatypes.STRING(255),
        allowNull: false,
      },
      data: {
        type: Datatypes.TEXT,
        allowNull: true,
      },
      description:{
        type: Datatypes.TEXT,
        allowNull: false,
      },
      image:{
        type:Datatypes.TEXT,
        allowNull: false,
      },
      price:{
        type:Datatypes.DECIMAL(10,1),
        allowNull:false,
      }
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return media;
};
module.exports = modelMedia;
