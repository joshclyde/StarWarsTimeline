import Jimp from 'jimp';
import axios from 'axios';
import {parse, HTMLElement} from 'node-html-parser';
import * as database from '../database';

export class Book {
  id: string;
  root: HTMLElement;

  constructor(id: string) {
    this.id = id;
    const html = database.readFileSync(`pages/book/${id}.html`);
    this.root = parse(html);
  }

  static async getAllBooks() {
    const files = await database.readDirectory('pages/book');
    return files.map(fileName => {
      return new Book(fileName.replace('.html', ''));
    });
  }

  static async scrapeBook(url: string) {
    const {data} = await axios.get<string>(`https://starwars.fandom.com${url}`);
    await database.writeFile(`pages/book/${url.split('/')[2]}.html`, data);
  }

  get imageFileName() {
    return `${this.id.replace(/[^a-zA-Z0-9]/g, '')}.jpg`;
  }

  get imageUrl() {
    return this.root.querySelector('.pi-image-thumbnail')?.getAttribute('src');
  }

  get title(): string {
    return this.id.replaceAll('_', ' ');
  }

  get timeline() {
    const element = this.root.querySelector("[data-source='timeline']")
      ?.childNodes[3].innerText;
    if (element) {
      const dates = element
        .match(/\d+ (ABY|BBY)/g)
        ?.map(x => {
          const [num, year] = x.split(' ');
          return year === 'BBY' ? -num : Number(num);
        })
        .sort((a, b) => a - b);
      if (dates) {
        return {
          timelineStart: dates[0],
          timelineEnd:
            dates.length > 1 && dates[0] !== dates.at(-1)
              ? dates?.at(-1)
              : undefined,
        };
      }
    }
  }

  get timelineStart() {
    return this.timeline?.timelineStart;
  }

  get timelineEnd() {
    return this.timeline?.timelineEnd;
  }

  get data() {
    return {
      title: this.title,
      timelineStart: this.timelineStart,
      timelineEnd: this.timelineEnd,
    };
  }

  async scrapeImage(soft = true) {
    if (soft) {
      const exists = await database.doesPathExist(
        `images/${this.imageFileName}`,
      );
      if (exists) {
        console.log(
          `Image for ${this.title} already exists, so skipping re-download.`,
        );
        return;
      }
    }
    if (!this.imageUrl) {
      console.log(
        `No url was found for the image for ${this.title}, so skipping download..`,
      );
      return;
    }
    try {
      const image = await Jimp.read(this.imageUrl);
      image.write(`./scripts/data/images/${this.imageFileName}`);
    } catch (e) {
      console.log(
        `Error when downloading the image for ${this.title}, but continuing downloading the rest of the images.`,
      );
    }
  }
}
