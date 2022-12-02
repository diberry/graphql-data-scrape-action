"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvironmentVars = void 0;
const core_1 = __importDefault(require("@actions/core"));
function getEnvironmentVars() {
    // Assume JS action and use the core module to get values
    if (core_1.default.getInput("bearer-token")
        || core_1.default.getInput("bearer-token-override")) {
        const graphQlUrl = core_1.default.getInput("graphql-url");
        const bearerToken = core_1.default.getInput("bearer-token");
        const bearerTokenOverride = (core_1.default.getInput("bearer-token-override")) === 'true' ? true : false;
        const query = core_1.default.getInput("query");
        const queryVariables = core_1.default.getInput("query-variables");
        const githubGraphqlDefaultOrg = core_1.default.getInput("github-graphql-default-org");
        return {
            graphQlUrl,
            bearerToken,
            bearerTokenOverride,
            query,
            queryVariables,
            githubGraphqlDefaultOrg
        };
    }
    else {
        // Assume container action and use process.env to get values
        const graphQlUrl = process.env["graphql-url"];
        const bearerToken = process.env["bearer-token"];
        const bearerTokenOverride = (process.env["bearer-token-override"] === "true") ? true : false;
        const query = process.env["query"];
        const queryVariables = process.env["query-variables"];
        const githubGraphqlDefaultOrg = process.env["github-graphql-default-org"];
        return {
            graphQlUrl,
            bearerToken,
            bearerTokenOverride,
            query,
            queryVariables,
            githubGraphqlDefaultOrg
        };
    }
}
exports.getEnvironmentVars = getEnvironmentVars;
