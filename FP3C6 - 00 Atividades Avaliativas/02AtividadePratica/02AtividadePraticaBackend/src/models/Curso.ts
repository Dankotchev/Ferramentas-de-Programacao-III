import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Nivel from "./Nivel";
import Disciplina from "./Disciplina";

@Entity("curso")
export default class Curso {
  @PrimaryGeneratedColumn("increment")
  codigo: number;

  @Column()
  nome: string;

  @Column()
  periodo: string;

  @ManyToOne(() => Nivel, nivel => nivel.cursos)
  @JoinColumn({ name: "nivel_codigo"})
  nivel: Nivel;

  @OneToMany(() => Disciplina, disciplina => disciplina.curso, {
    cascade: ["insert", "update", "remove"]
  })
  disciplinas: Disciplina[];
}
