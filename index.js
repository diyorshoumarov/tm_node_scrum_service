require('dotenv').config();
const mongoose = require("mongoose");
const protoLoader = require("@grpc/proto-loader");
const grpc = require("@grpc/grpc-js");

const Config = require("./config/config");
const Logger = require("./config/logger");

const DeveloperService = require("./service/developer");

// loading proto file
const PROTO_URL = __dirname + "/protos/scrum_service/scrum_service.proto";
const packageDefinition = protoLoader.loadSync(PROTO_URL, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const scrumServiceProto =
    grpc.loadPackageDefinition(packageDefinition).scrum_service;

async function main() {
    Logger.debug("Main function is running");

    let mongoDBUrl = `mongodb://${Config.mongoUser}:${Config.mongoPassword}@${Config.mongoHost}:${Config.mongoPort}/${Config.mongoDatabase}`
    if (Config.mongoHost == "localhost") {
        mongoDBUrl = `mongodb://${Config.mongoHost}:${Config.mongoPort}/${Config.mongoDatabase}`
    }
    
    Logger.debug("Connecting to db: " + mongoDBUrl);

    mongoose.connect(
        mongoDBUrl,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        (err) => {
            if (err) {
                console.log(`There is an error in connecting db "${mongoDBUrl}": ${err.message}`)
                Logger.error(
                    `There is an error in connecting db "${mongoDBUrl}": ${err.message}`
                );
                process.exit(0);
            }
        }
    );

    mongoose.connection.once("open", async function () {
        Logger.info("Connected to the database");
    });

    var server = new grpc.Server();
    server.addService(scrumServiceProto.DeveloperService.service, DeveloperService);

    server.bindAsync(
        Config.serviceHost + Config.grpcPort,
        grpc.ServerCredentials.createInsecure(),
        (err, bindPort) => {
            if (err) {
                throw new Error("Error while binding grpc server to the port");
            }

            Logger.info("gRPC server is running at %s", Config.serviceHost + Config.grpcPort);
            
            server.start();
        }
    );
}

main();