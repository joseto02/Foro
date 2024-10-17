export class Comentario {
    id_comentario!: number;
    fecha_comentario!: Date;
    texto!: string;
    id_usuario!: number;
    id_contenido?: number;
    id_foro?: number;
    nickName!: string;  
    foto!: string;
}
