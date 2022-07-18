const modelTemplate = (sequelize, Datatypes) => {
  const template = sequelize.define(
    "template",
    {
      id: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Datatypes.STRING(255),
        allowNull: false,
      },
      html: {
        type: Datatypes.TEXT,
        allowNull: false,
      },
      css: {
        type: Datatypes.TEXT,
        allowNull: false,
      },
      pc_img_url: {
        type: Datatypes.STRING(255),
        allow_null: false,
      },
      tablet_img_url: {
        type: Datatypes.STRING(255),
        allow_null: false,
      },
      mobile_img_url: {
        type: Datatypes.STRING(255),
        allow_null: false,
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return template;
};
module.exports = modelTemplate;
