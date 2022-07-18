const modelPayment = (sequelize, Datatypes) => {
  const payment = sequelize.define(
    "payment",
    {
      id: {
        type: Datatypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      address: {
        type: Datatypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      owner: {
        type: Datatypes.STRING(255),
        allowNull: false,
      }
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return payment;
};
module.exports = modelPayment;
