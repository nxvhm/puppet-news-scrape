import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm"

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

    static formatDateString(dateString:string):string{
      
      dateString = dateString.replace(/(?:\r\n|\r|\n)/g, '')
        .trim()
        .replace(/ +/, " ");

      if (dateString.includes("Published ")) {
        dateString = dateString.replace("Published ", "");
      }

      if (dateString.includes("Updated ")) {
        dateString = dateString.replace("Updated ", "");
      }

      console.log('dateString: ', dateString.trim());

      let date = new Date(dateString.trim());

      return [
        date.getFullYear(),
        date.getMonth()+1,
        date.getDate()
      ].join('-');
    }

}
