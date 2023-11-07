import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Curso from './Curso';

@Entity('nivel')
export default class Nivel {
  @PrimaryGeneratedColumn('increment')
  codigo: number;

  @Column()
  nome: string;

  @OneToMany(() => Curso, cursos => cursos.nivel, {
    cascade: ["insert", "update", "remove"]
  })
  cursos: Curso[];
}
