
const getEnvironmentVars = require('./get-environment-vars');
const getGraphQLCursor = require("../get-data");

try {
  const envVars = getEnvironmentVars();

  // check errors
  if (!envVars.bearerToken && envVars.bearerTokenOverride == "false") {
    throw new Error("missing required bearer token");
  }

  const queryParams = {
    personal_access_token: envVars.bearerToken,
    personal_access_token_required: envVars.bearerTokenOverride,
    url: envVars.graphQlUrl,
    query,
    queryVariables,
    orgName
  }

  return getGraphQLCursor(queryParams);

} catch (error) {
  core.setFailed(error.message);
}
