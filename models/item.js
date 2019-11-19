  module.exports = function(sequelize, DataTypes) {
    var Item = sequelize.define("Item", {
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1]
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1]
      },
      itemId: {
        type: DataTypes.STRING,
        allowNull: false,
        len: [1]
      }

    });
  
    Item.associate = function(models) {
      Item.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };

    return Item;
  };
  