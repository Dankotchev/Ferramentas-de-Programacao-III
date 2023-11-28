import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("usuario")
export default class Usuario {
  @PrimaryGeneratedColumn("increment")
  codigo: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  senha: string;
}
