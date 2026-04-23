import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    fullName: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    phone_number: {
    type: DataTypes.STRING(15),
    allowNull: true,
    },

    city: {
    type: DataTypes.STRING(100),
    allowNull: true,
    },
    
    postcode: {
    type: DataTypes.STRING(10),
    allowNull: true,
    },

    address: {
    type: DataTypes.TEXT,
    allowNull: true,
    },

    profile_picture: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    role: {
      type: DataTypes.ENUM("admin", "user"),
      allowNull: true,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  },
  {
    tableName: "users",
    timestamps: true, // createdAt & updatedAt
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);

export default User;
