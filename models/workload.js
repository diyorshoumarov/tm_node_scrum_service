const mongoose = require("mongoose");
const { v4 } = require("uuid");

const WorklaodSchema = mongoose.Schema(
    {
        _id: {
            type: String,
            default: v4
        },
        from_date: {
            type: Date,
            required: [true, "from_date is required"],
            unique: true
        },
        to_date: {
            type: Date,
            required: [true, "to_date is required"]
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

WorklaodSchema.index(
    {
        from_date: 1
    }
)

module.exports = mongoose.model("WorkloadModel", WorklaodSchema);