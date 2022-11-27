import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity("news")
export default class Article {
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

}
