"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.loopThruCursors = void 0;
const axios_1 = __importDefault(require("axios"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const QUERY_ORG_REPOS_AGGREGATE_VARIABLES = {
    organization: "Azure-Samples",
    after: "",
    pageSize: parseInt(((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.GRAPHQL_CURSOR_SIZE) || "") || 100,
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
function getGraphQLCursor(personal_access_token, url = "https://api.github.com/graphql", query = QUERY_ORG_REPOS_AGGREGATE, queryVariables = QUERY_ORG_REPOS_AGGREGATE_VARIABLES, orgName = "Azure-Samples") {
    return __awaiter(this, void 0, void 0, function* () {
        if (!personal_access_token)
            throw new Error("missing required bearer token");
        if (!query && !orgName) {
            // Nothing to do so return
            throw new Error("missing query and orgName - 1 of these must be provided");
        }
        // Prepare graphQL query for axios
        var data = JSON.stringify({
            query,
            queryVariables,
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
        const response = yield (0, axios_1.default)(config);
        return response;
    });
}
// Assume variable for next cursor is `nextCursor`
function getGraphQLCursorWithFetch(personal_access_token, url = "https://api.github.com/graphql", query = QUERY_ORG_REPOS_AGGREGATE, queryVariables = QUERY_ORG_REPOS_AGGREGATE_VARIABLES, orgName = "Azure-Samples") {
    return __awaiter(this, void 0, void 0, function* () {
        if (!personal_access_token)
            throw new Error("missing required bearer token");
        if (!query && !orgName) {
            // Nothing to do so return
            throw new Error("missing query and orgName - 1 of these must be provided");
        }
        // Prepare graphQL query for axios
        var data = JSON.stringify({
            query,
            queryVariables,
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
        const response = yield (0, node_fetch_1.default)(url, config);
        if (response.ok) {
            return response.json();
        }
        else {
            return [];
        }
        const data = yield response.json();
        return data;
    });
}
function loopThruCursors(url, personal_access_token, query, variables) {
    return __awaiter(this, void 0, void 0, function* () {
        let hasNextPage = true;
        let data = [];
        let after, string;
        do {
            const response = yield getGraphQLCursor(url, personal_access_token, query, Object.assign(Object.assign({}, variables), { after }));
            if (!response.data.error &&
                response.status == 200 &&
                response.data.data &&
                response.data.data.organization &&
                response.data.data.organization.repositories) {
                console.log(`returned: ${response.data.data.organization.repositories.pageInfo.startCursor}-${response.data.data.organization.repositories.pageInfo.hasNextPage}-${response.data.data.organization.repositories.pageInfo.endCursor}-${response.data.data.organization.repositories.edges.length}`);
                console.log(`${response.data.data.organization.repositories.edges[0].node.repositoryName}`);
                const graphQLData = response.data.data;
                hasNextPage = graphQLData.organization.repositories.pageInfo.hasNextPage;
                after =
                    graphQLData.organization.repositories.pageInfo.endCursor;
                const flattenEdge = graphQLData.organization.repositories.edges.map((edge) => edge.node);
                data.push(...flattenEdge);
            }
            else {
                throw Error(response.data.error);
            }
        } while (hasNextPage);
        return data;
    });
}
exports.loopThruCursors = loopThruCursors;
// loopThruCursors()
//   .then(function (repositories) {
//     console.log(repositories);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
