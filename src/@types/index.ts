export interface Parameter {
  Name: string;
  Type: string;
  Value: string;
  Version: number;
  LastModifiedDate: string;
  ARN: string;
  DataType: string;
}

export interface Parameters {
  Parameters: Parameter[];
}

export interface ConfigEnv {
  name: string;
  paths: string[];
}

export interface Config {
  filePath: 'string';
  enableUpdateDate: boolean;
  envs: ConfigEnv[];
}
