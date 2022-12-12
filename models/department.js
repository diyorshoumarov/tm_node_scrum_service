const mongoose = require("mongoose");
const { v4 } = require("uuid");

const DepartmentSchema = mongoose.Schema(
    {
        _id: {
            type: String,
            default: v4
        },
        workload_id: {
            type: String,
            required: [true, "workload_id is required"]
        },
        project_id: {
            type: String,
            required: [true, "project_id is required"]
        },
        role_id: {
            type: String,
            required: [true, "role_id is required"]
        },
        plan: {
            type: Number,
            default: 1,
            min: 0
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

DepartmentSchema.index(
    {
        workload_id: 1,
        project_id: 1
    }
)

module.exports = mongoose.model("DepartmentModel", DepartmentSchema);