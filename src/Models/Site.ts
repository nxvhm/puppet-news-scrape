import { Entity, BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity("sites")
export default class Site extends BaseEntity {
    @PrimaryGeneratedColumn()
    site_id: number

    @Column('varchar')
    url: string

    @Column('varchar')
    name: string
}
