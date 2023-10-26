import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("product")
export default class Product {
  @PrimaryGeneratedColumn("increment")
  codigo: number;

  @Column()
  nome: string;

  @Column()
  preco: number;

  @Column()
  estoque: number;
}
