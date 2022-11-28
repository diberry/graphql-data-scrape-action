var axios = require("axios");

const QUERY_ORG_REPOS_AGGREGATE_VARIABLES = {
  organization: "Azure-Samples",
  after: "",
  pageSize: parseInt(process.env.GRAPHQL_CURSOR_SIZE) || 100,
};

const QUERY_ORG_REPOS_AGGREGATE = `
query OrgReposMegaInfoExample($organization:String!, $pageSize: Int, $after: String) {
  organization(login:$organization){
    repositories (after:$after, first: $pageSize, orderBy: {field: STARGAZERS, direction: DESC}){
        totalCount
        pageInfo {
          startCursor
          hasNextPage
          endCursor
        }
        edges {
          cursor
          node {
            repositoryName:name 
            id
              url
              descriptionHTML
              updatedAt
              stargazers {
                totalCount
              }
              forks {
                totalCount
              }
              issues(states:[OPEN]) {
                totalCount
              }
              pullRequests(states:[OPEN]) {
                totalCount
              }
              
          }
        }
      }
    }
  }
`;

// const QUERY = QUERY_ORG_REPOS_AGGREGATE;
// const VARIABLES = QUERY_ORG_REPOS_AGGREGATE_VARIABLES;

// Assume variable for next cursor is `nextCursor`
async function getGraphQLCursor(
  personal_access_token,
  personal_access_token_required=false,
  url = "https://api.github.com/graphql",
  query = QUERY_ORG_REPOS_AGGREGATE,
  variables = QUERY_ORG_REPOS_AGGREGATE_VARIABLES,
  orgName = "Azure-Samples"
) {
  if (!personal_access_token && personal_access_token_required)
    throw new Error("missing required bearer token");

  if (!query && !orgName) {
    // Nothing to do so return
    throw new Error("missing query and orgName - 1 of these must be provided");
  }

  // Prepare graphQL query for axios
  var data = JSON.stringify({
    query,
    variables,
  });

  // Prepare HTTP request
  var config = {
    data,
    url,
    method: "post",
    headers: {
      Authorization: "Bearer " + personal_access_token,
      "Content-Type": "application/json",
    },
  };

  const response = await axios(config);
  return response;
}

async function loopThruCursors() {
  let hasNextPage = true;
  let data = [];
  VARIABLES.after = null;

  do {
    const response = await getGraphQLCursor(
      GRAPHQL_URL,
      personal_access_token,
      QUERY,
      VARIABLES
    );

    if (
      !response.data.error &&
      response.status == 200 &&
      response.data.data &&
      response.data.data.organization &&
      response.data.data.organization.repositories
    ) {
      console.log(
        `returned: ${response.data.data.organization.repositories.pageInfo.startCursor}-${response.data.data.organization.repositories.pageInfo.hasNextPage}-${response.data.data.organization.repositories.pageInfo.endCursor}-${response.data.data.organization.repositories.edges.length}`
      );
      console.log(
        `${response.data.data.organization.repositories.edges[0].node.repositoryName}`
      );
      const graphQLData = response.data.data;

      hasNextPage = graphQLData.organization.repositories.pageInfo.hasNextPage;
      VARIABLES.after =
        graphQLData.organization.repositories.pageInfo.endCursor;

      const flattenEdge = graphQLData.organization.repositories.edges.map(
        (edge) => edge.node
      );
      data.push(...flattenEdge);
    } else {
      throw Error(response.data.error);
    }
  } while (hasNextPage);

  return data;
}

loopThruCursors()
  .then(function (repositories) {
    console.log(repositories);
  })
  .catch(function (error) {
    console.log(error);
  });
