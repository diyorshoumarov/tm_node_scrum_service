const Config = {
    serviceName:  getOrReturnDefaultValue("SERVICE_NAME", "your_service_name"),
    environment: getOrReturnDefaultValue("ENVIRONMENT", "debug"), // debug, test, release
    version: getOrReturnDefaultValue("VERSION", "v1"),

    serviceHost: getOrReturnDefaultValue("SERVICE_HOST", "localhost"),
    grpcPort: getOrReturnDefaultValue("GRPC_PORT","your_grpc_port"),

    mongoHost: getOrReturnDefaultValue("MONGO_HOST", "localhost"),
    mongoPort: getOrReturnDefaultValue("MONGO_PORT", "your_mongodb_port"),
    mongoUser: getOrReturnDefaultValue("MONGO_USER", "your_mongodb_user"),
    mongoPassword: getOrReturnDefaultValue("MONGO_PASSWORD", "your_mongodb_password"),
    mongoDatabase: getOrReturnDefaultValue("MONGO_DATABASE", "node_scrum_service"),
}

function getOrReturnDefaultValue(name, def = "") {
    if (process.env[name]) {
        return process.env[name];
    }
    return def;
}

module.exports = Config;