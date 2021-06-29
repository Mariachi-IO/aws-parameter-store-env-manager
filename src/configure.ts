#!/usr/bin/env node

import { Config, ConfigEnv, Parameter, Parameters } from './@types';
import { fetchParametersByRoute } from './awsUtils';
import { getDate } from './utils';

const readline = require('readline');
const fs = require('fs');
const config = require('../envConfig') as Config;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(message: string) {
  console.clear();
  return new Promise((resolve) =>
    rl.question(message, (option: string) => {
      console.clear();
      resolve(option);
    }),
  );
}

export async function configure() {
  try {
    const envNames = config.envs
      .map((configEnv: ConfigEnv, i: number) => `${i + 1}. ${configEnv.name}.\n`, '')
      .join('');
    const option = (await question(`Which env do you want to configure?\n${envNames}`)) as number;
    if (option < 1 || option > config.envs.length) {
      throw Error(`select a valid option from the range 1 to ${config.envs.length}`);
    }
    const env = config.envs[option - 1];
    console.log(`Option [${env.name}] choosed`);
    const parametersResponse = (await fetchParametersByRoute(env.paths[0])) as string;
    const parameters = JSON.parse(parametersResponse) as Parameters;
    const content = parameters.Parameters.map((parameter: Parameter) => {
      const path = parameter.Name;
      const index = path.lastIndexOf('/');
      const name = path.substring(index + 1, path.length);
      let date = '';
      if (config.enableUpdateDate) {
        date = `  # updated - ${getDate(new Date(parameter.LastModifiedDate))}`;
      }
      console.log(`${name}=${parameter.Value}${date}`);
      return `${name}=${parameter.Value}${date}`;
    }).join('\n');
    const dateContent = `# [env-manager] automatically updated on ${getDate(new Date())}\n`;
    fs.writeFileSync('.env', dateContent.concat(content));
  } catch (e) {
    console.error(e);
  } finally {
    rl.close();
    process.exit(0);
  }
}
