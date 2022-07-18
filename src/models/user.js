const modelUser = (sequelize, Datatypes) => {
  const media = sequelize.define(
    "user",
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
      accountWallet: {
        type: Datatypes.TEXT,
        allowNull: true,
      },
      email:{
        type: Datatypes.STRING,
        allowNull: false,
      },
      password:{
        type: Datatypes.STRING,
        allowNull: false,
      },
      avatar:{
        type:Datatypes.TEXT,
        defaultValue:'https://res.cloudinary.com/imdo2412/image/upload/v1657186576/nft_generator/khcoc5osev4k74vwfjnt.png'
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
module.exports = modelUser;

