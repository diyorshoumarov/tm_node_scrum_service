const mongoose = require("mongoose");
const { v4 } = require("uuid");

const DeveloperSchema = mongoose.Schema(
    {
        _id: {
            type: String,
            default: v4
        },
        department_id: {
            type: String,
            required: [true, "department_id is required"]
        },
        user_id: {
            type: String,
            required: [true, "user_id is required"]
        },
        given: {
            type: Number,
            default: 1,
            min: 0,
            max: 1
        }
    },
    {
        timestamps: { 
            createdAt: "created_at",
            updatedAt: "updated_at"
        },
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    }
)

DeveloperSchema.index(
    {
        department_id: 1
    }
)

module.exports = mongoose.model("DeveloperModel", DeveloperSchema);