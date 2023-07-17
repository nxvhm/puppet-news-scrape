import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm"
import * as https from "https"
import * as fs from "fs"

@Entity("news")
export default class Article extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column('varchar')
    url: string

    @Column('mediumint')
    site_id: number

    @Column('varchar')
    title: string

    @Column('date')
    date: string

    @Column('text')
    text: string

    @Column('varchar')
    author: string

    @Column('tinyint')
    is_analysed: boolean

    @Column('varchar')
    category: string

    static exists(url: string) {
      return this.createQueryBuilder("news")
        .where('news.url = :url', {url})
        .getCount()
    }

    static async saveImageFromUrl(url: string, articleId: number) {
      const imgName = String(articleId)+'.jpg',
            path = process.env.IMAGE_PATH,
            fullPath = path+'/'+imgName,
            file = fs.createWriteStream(fullPath);

      https.get(url, response => {
        response.pipe(file);
      
        file.on('finish', () => {
          file.close();
          console.log(`Image downloaded as ${imgName}`);
        });
      }).on('error', err => {
        console.error(`Error downloading image: ${err.message}`);
      });




    }

}
