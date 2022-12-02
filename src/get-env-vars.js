const core = require("@actions/core");

export function getEnvironmentVars(){

    // Assume JS action and use the core module to get values
    if(core.getInput("bearer-token").length() > 0  
    || core.getInput("bearer-token-override").length() > 0){

        const graphQlUrl = core.getInput("graphql-url");
        const bearerToken = core.getInput("bearer-token");
        const bearerTokenOverride = core.getInput("bearer-token-override");
        const query = core.getInput("query");
        const queryVariables = core.getInput("query-variables");
        const githubGraphqlDefaultOrg = core.getInput("github-graphql-default-org");

        return {
            graphQlUrl,
            bearerToken,
            bearerTokenOverride,
            query,
            queryVariables,
            githubGraphqlDefaultOrg
        }

    } else {

        // Assume container action and use process.env to get values
        const graphQlUrl = process.env["graphql-url"];
        const bearerToken = process.env["bearer-token"];
        const bearerTokenOverride = process.env["bearer-token-override"];
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
        }
    }
}