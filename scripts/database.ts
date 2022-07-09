import * as fs from 'fs-extra';
import {
  outputFile as fsOutputFile,
  outputJson as fsOutputJson,
  pathExists as fsPathExists,
  readdir as fsreaddir,
  readFile as fsReadFile,
  readFileSync as fsReadFileSync,
  readJson as fsReadJson,
} from 'fs-extra';

export const readDirectory = (path: string) =>
  fsreaddir(`./scripts/data/${path}`);

export const readJson = (path: string) => fsReadJson(`./scripts/data/${path}`);
export const writeJson = (path: string, data: any) =>
  fsOutputJson(`./scripts/data/${path}`, data);

export const readFile = (path: string) =>
  fsReadFile(`./scripts/data/${path}`, 'utf8');
export const readFileSync = (path: string) =>
  fsReadFileSync(`./scripts/data/${path}`, 'utf8');
export const writeFile = (path: string, data: any) =>
  fsOutputFile(`./scripts/data/${path}`, data);

export const doesPathExist = (path: string) =>
  fsPathExists(`./scripts/data/${path}`);

export const copyFile = (path: string, destPathFromRoot: string) =>
  fs.copyFile(`./scripts/data/${path}`, destPathFromRoot);
