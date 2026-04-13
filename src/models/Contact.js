import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Contact = sequelize.define(
  "Contact",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },

    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },

    subject: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("pending", "resolved", "rejected"),
      allowNull: false,
      defaultValue: "pending",
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "contacts",
    timestamps: true, // enables createdAt & updatedAt
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Contact;