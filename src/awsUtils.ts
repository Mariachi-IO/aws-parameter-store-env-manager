const { exec } = require('child_process');

export function fetchParametersByRoute(route: string): Promise<string> {
  const cmd = `aws ssm get-parameters-by-path --path ${route} --with-decryption`;
  return new Promise((resolve, reject) => {
    exec(cmd, (err: any, stdout: string) => {
      if (err) reject(err);
      resolve(stdout);
    });
  });
}
