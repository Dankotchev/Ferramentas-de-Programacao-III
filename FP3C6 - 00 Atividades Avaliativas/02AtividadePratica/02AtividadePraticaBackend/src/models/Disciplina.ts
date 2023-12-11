import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Curso from "./Curso";

@Entity("disciplina")
export default class Disciplina {
  @PrimaryGeneratedColumn("increment")
  codigo: number;

  @Column()
  nome: string;

  @ManyToOne(() => Curso, curso => curso.disciplinas)
  @JoinColumn({ name: "curso_codigo"})
  curso: Curso
}
