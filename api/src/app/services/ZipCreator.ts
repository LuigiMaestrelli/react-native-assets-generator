import AdmZip from 'adm-zip';
import path from 'path';

interface Config {
  files: string[];
  name: string;
}

export default class ZipCreator {
  private files: string[];

  private output: string;

  public constructor(config: Config) {
    this.files = config.files;

    this.output = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'tmp',
      'output',
      `${config.name}.zip`
    );
  }

  public async createFile(): Promise<string> {
    return new Promise((resolve, reject): void => {
      const zip = new AdmZip();

      this.files.forEach((file): void => {
        zip.addLocalFile(file);
      });

      zip.writeZip(this.output, (err): void => {
        if (err) {
          reject(err);
          return;
        }

        resolve(this.output);
      });
    });
  }
}
