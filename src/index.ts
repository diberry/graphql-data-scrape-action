import core from '@actions/core';

import {getGraphQLCursor} from '../get-data';

async function run(): Promise<void> {
  try {
    const gitHubPersonalAccessToken: string = core.getInput('bearer-token');

    return getGraphQLCursor(gitHubPersonalAccessToken);
  } catch (error: unknown) {
    core.setFailed(error as Error);
  }
}

run();
