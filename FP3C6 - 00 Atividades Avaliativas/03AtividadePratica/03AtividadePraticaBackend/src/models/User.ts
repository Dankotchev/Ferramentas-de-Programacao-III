import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("user")
export default class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    nome: string;

    @Column()
    login: string;

    @Column()
    senha: string;

    @Column()
    salario: number;
}