import fs from 'fs';
import sharp from 'sharp';
import path from 'path';
import svgTools from 'simple-svg-tools';

interface ImageConfig {
  baseSize: number;
  path: string;
  color: string;
  name: string;
  density: number;
}

interface Result {
  outputPath: string;
  files: string[];
}

export default class ImageCreator {
  private config: ImageConfig;

  private outputDir: string;

  public constructor(config: ImageConfig) {
    const hash = Date.now();

    this.outputDir = path.join(__dirname, '..', '..', '..', 'tmp', `${hash}`);

    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }

    this.config = config;
  }

  private async changeColor(): Promise<void> {
    const svgText = fs.readFileSync(this.config.path, 'utf8');

    let svg = new svgTools.SVG(svgText);
    svg = await svgTools.ChangePalette(svg, this.config.color);

    return svgTools.ExportSVG(svg, this.config.path);
  }

  private async generateSize(multiplier: number): Promise<string> {
    const size = this.config.baseSize * multiplier;

    const suffix = multiplier === 1 ? '' : `@${multiplier}x`;
    const outputFile = path.join(
      this.outputDir,
      `${this.config.name}${suffix}.png`
    );

    await sharp(this.config.path, { density: this.config.density })
      .resize(size)
      .png()
      .toFile(outputFile);

    return outputFile;
  }

  public async createFiles(): Promise<Result> {
    await this.changeColor();

    const result: Result = {
      outputPath: this.outputDir,
      files: []
    };

    let filePath = await this.generateSize(1);
    result.files.push(filePath);

    filePath = await this.generateSize(2);
    result.files.push(filePath);

    filePath = await this.generateSize(3);
    result.files.push(filePath);

    return result;
  }
}
