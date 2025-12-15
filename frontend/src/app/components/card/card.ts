import { Component, OnInit } from '@angular/core';
import { Button01 } from "../button-01/button-01";
import { Button02 } from "../button-02/button-02";

interface CardInfo {
  imagen: string;
  titulo: string;
  descripcion: string;
}

@Component({
  selector: 'app-card',
  imports: [Button01, Button02],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card implements OnInit{

  card: CardInfo = {
    imagen: '',
    titulo: '',
    descripcion: ''
  };

    ngOnInit(): void {
    // Aquí obtienes los datos de tu servicio/base de datos
    this.cargarDatos();
  }

  cargarDatos(): void {
    // Ejemplo - reemplaza con tu llamada al servicio
    this.card = {
      imagen: 'https://res.cloudinary.com/du4tcug9q/image/upload/v1763726311/image-habitation_mmy7ly.png',
      titulo: 'Aniversario especial',
      descripcion: 'Celebra tu aniversario con nosotros y recibe una botella de vino espumoso y fresas con chocolate de cortesía.'
    };
  }
}
