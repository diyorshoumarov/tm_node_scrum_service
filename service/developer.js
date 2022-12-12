const CatchWrapService = require("../wrappers/service");
const DeveloperStorage = require("../storage/developer");

const namespace = "Service.Developer";

const DeveloperService = {
    Create: CatchWrapService(`${namespace}.Create`, DeveloperStorage.Create),
    GetById: CatchWrapService(`${namespace}.GetById`, DeveloperStorage.GetById),
    GetByDepartmentId: CatchWrapService(`${namespace}.GetByDepartmentId`, DeveloperStorage.GetByDepartmentId),
    Update: CatchWrapService(`${namespace}.Update`, DeveloperStorage.Update),
    Delete: CatchWrapService(`${namespace}.Delete`, DeveloperStorage.Delete),
};

module.exports = DeveloperService;