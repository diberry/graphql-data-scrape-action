const core = require("@actions/core");
const github = require("@actions/github");

const getGraphQLCursor = require("./get-data");

try {
  const graphQlUrl = core.getInput("graphql-url");
  const bearerToken = core.getInput("bearer-token");
  const bearerTokenOverride = core.getInput("bearer-token-override");
  const query = core.getInput("query");
  const queryVariables = core.getInput("query-variables");
  const githubGraphqlDefaultOrg = core.getInput("github-graphql-default-org");

  // check errors
  if (!bearerToken && bearerTokenOverride == "false") {
    throw new Error("missing required bearer token");
  }

  console.log(`Hello ${nameToGreet}!`);
  const time = new Date().toTimeString();

  core.setOutput("time", time);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);

  return getGraphQLCursor(bearerToken);

} catch (error) {
  core.setFailed(error.message);
}
