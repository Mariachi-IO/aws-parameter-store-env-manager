#!/usr/bin/env node

import { Config, ConfigEnv, Parameters } from './@types';
import { fetchParametersByRoute } from './awsUtils';
import { getDate, paramAsNumber } from './utils';

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

export async function configure(params: string[]) {
  try {
    const envNames = config.envs
      .map((configEnv: ConfigEnv, i: number) => `${i + 1}. ${configEnv.name}.\n`, '')
      .join('');
    let option: number;
    if (params[0]) {
      option = paramAsNumber(params[0]) + 1;
    } else {
      option = (await question(`Which env do you want to configure?\n${envNames}`)) as number;
      if (option < 1 || option > config.envs.length) {
        throw Error(`select a valid option from the range 1 to ${config.envs.length}`);
      }
    }
    const env = config.envs[option - 1];
    console.log(`Environment \"${env.name}\" selected`);

    const parametersResponses = await Promise.all(
      env.paths.map(async (path) => {
        const response = (await fetchParametersByRoute(path)) as string;
        const parameterResponse = JSON.parse(response) as Parameters;
        return [...parameterResponse.Parameters];
      }),
    );
    let content = '';
    parametersResponses.forEach((parameters) =>
      parameters.forEach((parameter) => {
        const path = parameter.Name;
        const index = path.lastIndexOf('/');
        const name = path.substring(index + 1, path.length);
        let date = '';
        if (config.enableUpdateDate) {
          date = `  # updated - ${getDate(new Date(parameter.LastModifiedDate))}`;
        }
        console.log(`${name}=${parameter.Value}${date}`);
        content += `${name}=${parameter.Value}${date}\n`;
      }),
    );
    const dateContent = `# [env-manager] automatically updated on ${getDate(new Date())}\n`;
    fs.writeFileSync(config.filePath, dateContent.concat(content));
  } catch (e) {
    console.error(e);
  }
}
