# GraphQL query javascript action

This action runs a GraphQL query and returns the data as JSON.

## Inputs

### `bearer-token`

The bearer token used to access the GraphQL endpoint. If your endpoint doesn't require a bearer token, set the `bearer-token-override` input to true. **Generally required**

### `bearer-token-override`

Set to true if your GraphQL endpoint doesn't require a bearer token for authentication. **Default** is false. 

### `graphql-url`

Set to GraphQL endpoint URL. **Default** is `https://api.github.com/graphql`.

### `query`

Set to GraphQL query. **Default** fetches all repositories for `Azure-Samples` org.

### `query-variables`

Set to GraphQL variables. 

### `github-graphql-default-org`

Set to GitHub org to use default query with a different GitHub org. **Default** is `Azure-Samples`.


## Outputs

### `data`

The data requested is returned in JSON object.

## Example usage - set bearer token

```yaml
uses: actions/graphql-data@v1.1
with:
  bearer-token: 'PUT YOUR GITHUB PERSONAL ACCESS TOKEN HERE'
```

## Example usage - change GitHub org name

```yaml
uses: actions/graphql-data@v1.1
with:
  bearer-token: 'PUT YOUR GITHUB PERSONAL ACCESS TOKEN HERE'
  github-graphql-default-org: 'MicrosoftDocs'
```

## Example usage - query your own endpoint without authentication

```yaml
uses: actions/graphql-data@v1.1
with:
  graphql-url: 'https://YOUR-DOMAIN.com/graphql'
  bearer-token-override: true
  query: `Query { whoami { name } }`
```