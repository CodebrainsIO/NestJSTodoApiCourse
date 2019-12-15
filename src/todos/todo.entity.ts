import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    task: string;

    @Column()
    complete: boolean;

    @Column()
    priority: number;
}
