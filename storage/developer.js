const CatchWrapDb = require("../wrappers/db");
const DeveloperModel = require("../models/developer");

const namespace = "Storage.Developer";

const DeveloperStorage = {
    Create: CatchWrapDb(`${namespace}.Create`, async (args) => {
        if (!args.department_id) { throw new Error("department_id is required to create developer") }
        if (!args.user_id) { throw new Error("user_id is required to create developer") }

        const developer = new DeveloperModel(args)
        const resp = await developer.save()

        return resp
    }),

    GetById: CatchWrapDb(`${namespace}.GetById`, async (args) => {
        if (!args.id) { throw new Error("id is required to get developer") }

        const resp = await DeveloperModel.findById(args.id)
        if (!resp) { throw new Error("developer with given id is not found") }

        return resp

    }),

    GetByDepartmentId: CatchWrapDb(`${namespace}.GetByDepartmentId`, async (args) => {
        if (!args.department_id) { throw new Error("department_id is required to developers") }

        const developers = await DeveloperModel.find({department_id: args.id})
        
        return developers
    }),

    Update: CatchWrapDb(`${namespace}.Update`, async (args) => {
        if (!args.id) { throw new Error("id is required to update developer") }
        if (!args.given) { throw new Error("given is required to update developer") }

        const developer = await DeveloperModel.findByIdAndUpdate(
            args.id,
            {
                $set: {
                    given: args.given
                }
            },
            {
                new: true,
                upsert: false
            }
        )
        if (!developer) { throw new Error("developer with given id is not found") }

        return developer
    }),

    Delete: CatchWrapDb(`${namespace}.Delete`, async (args) => {
        if (!args.id) { throw new Error("id is required to delete developer") }

        const developer = await DeveloperModel.findByIdAndDelete(args.id)
        if (!developer) { throw new Error("developer with given id is not found") }

        return {}
    }),
};

module.exports = DeveloperStorage;