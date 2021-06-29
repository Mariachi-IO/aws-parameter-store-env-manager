const {exec} = require('child_process');
const readline = require('readline');
const fs = require('fs');

const config = require('../envConfig');



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

(async function () {
  try {
    await configureEnv();
  } catch (e) {
    console.error(e);
  } finally {
    rl.close();
    process.exit(0);
  }
})();

async function configureEnv() {
  const envs = config.envs.map((env: { name: string }, i: number) => `${i + 1}. ${env.name}.\n`, "").join("");
  const option = await question(`Which env do you want to configure?\n${envs}`) as number;
  console.log("option: " + option)
  if (option < 1 || option > config.envs.length) {
    throw Error('Invalid release type');
  }
  const env = config.envs[option - 1];

  console.log(`Option ${env.paths} choosed`);
  await processEnv(env);
}

function fetchParametersByRoute(route: string): Promise<string> {
  const cmd = `aws ssm get-parameters-by-path --path ${route} --with-decryption`;
  return new Promise((resolve, reject) => {
    exec(cmd, (err: any, stdout: string) => {
      if (err) reject(err);
      resolve(stdout);
    });
  });
}

async function processEnv(env: { name: string, paths: string[] }) {
  const envsResponse = <string>await fetchParametersByRoute(env.paths[0]);
  const envsJson = JSON.parse(envsResponse);
  const content = envsJson.Parameters.map((parameter: any) => {
    const path = parameter.Name;
    const index = path.lastIndexOf('/');
    const name = path.substring(index + 1, path.length);
    console.log(`${name}=${parameter.Value}`)
    return `${name}=${parameter.Value}`
  }).join("\n");
  const dateContent = `# [env-manager] automatically updated on ${getDate()}\n`
  fs.writeFileSync(".env", dateContent.concat(content))
}


async function createFile(fileName: string, content: string) {
  return fs.writeFile(fileName, content)
}

function getDate() {
  return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
}
