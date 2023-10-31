import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Curso from './Curso';

@Entity('nivel')
export default class Nivel {
  @PrimaryGeneratedColumn('increment')
  codigo: number;

  @Column()
  nome: string;

  @OneToMany(() => Curso, curso => curso.nivel, {
    cascade: ["insert", "update", "remove"]
  })
  curso: Curso[];
}
