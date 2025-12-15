import { Component, OnInit } from '@angular/core';
import { Button01 } from "../../components/button-01/button-01";
import { Button02 } from "../../components/button-02/button-02";
import { CommonModule } from '@angular/common';

interface CardInfo {
  id: number;
  imagen: string;
  titulo: string;
  descripcion: string;
}

@Component({
  selector: 'app-home',
  imports: [Button01, Button02, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  
  // Arrays para cada sección
  mejoresOfertas: CardInfo[] = [];
  motelesCercanos: CardInfo[] = [];
  destinosPopulares: CardInfo[] = [];

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    // Mejores Ofertas
    this.mejoresOfertas = [
      {
        id: 1,
        imagen: 'https://res.cloudinary.com/du4tcug9q/image/upload/v1763726311/image-habitation_mmy7ly.png',
        titulo: 'Aniversario especial',
        descripcion: 'Celebra tu aniversario con nosotros y recibe una botella de vino espumoso.'
      },
      {
        id: 2,
        imagen: 'https://res.cloudinary.com/du4tcug9q/image/upload/v1763726311/image-habitation_mmy7ly.png',
        titulo: 'Noche Romántica',
        descripcion: 'Disfruta de una noche romántica con decoración especial y cena incluida.'
      },
      {
        id: 3,
        imagen: 'https://res.cloudinary.com/du4tcug9q/image/upload/v1763726311/image-habitation_mmy7ly.png',
        titulo: 'Escape de Fin de Semana',
        descripcion: 'Reserva 2 noches y obtén 20% de descuento en tu estadía.'
      },
      {
        id: 4,
        imagen: 'https://res.cloudinary.com/du4tcug9q/image/upload/v1763726311/image-habitation_mmy7ly.png',
        titulo: 'Paquete Luna de Miel',
        descripcion: 'Suite especial con jacuzzi privado y desayuno en la habitación.'
      },
      {
        id: 5,
        imagen: 'https://res.cloudinary.com/du4tcug9q/image/upload/v1763726311/image-habitation_mmy7ly.png',
        titulo: 'Oferta Premium',
        descripcion: 'Disfruta de nuestra suite premium con todas las comodidades.'
      }
    ];

    // Moteles Cercanos
    this.motelesCercanos = [
      {
        id: 6,
        imagen: 'https://res.cloudinary.com/du4tcug9q/image/upload/v1763726311/image-habitation_mmy7ly.png',
        titulo: 'Motel Paradise',
        descripcion: 'A solo 2 km de tu ubicación. Habitaciones confortables con todas las comodidades.'
      },
      {
        id: 7,
        imagen: 'https://res.cloudinary.com/du4tcug9q/image/upload/v1763726311/image-habitation_mmy7ly.png',
        titulo: 'Dreams Hotel',
        descripcion: 'A 5 km. Excelente ubicación con parqueadero privado y servicio 24/7.'
      },
      {
        id: 8,
        imagen: 'https://res.cloudinary.com/du4tcug9q/image/upload/v1763726311/image-habitation_mmy7ly.png',
        titulo: 'Sunset Motel',
        descripcion: 'A 8 km. Ambiente acogedor con vistas panorámicas y servicios premium.'
      },
      {
        id: 9,
        imagen: 'https://res.cloudinary.com/du4tcug9q/image/upload/v1763726311/image-habitation_mmy7ly.png',
        titulo: 'Costa Azul',
        descripcion: 'A 10 km. Frente al mar con las mejores vistas de la ciudad.'
      }
    ];

    // Destinos Populares
    this.destinosPopulares = [
      {
        id: 10,
        imagen: 'https://res.cloudinary.com/du4tcug9q/image/upload/v1763726311/image-habitation_mmy7ly.png',
        titulo: 'Zona Rosa',
        descripcion: 'La zona más exclusiva con los mejores moteles boutique de la ciudad.'
      },
      {
        id: 11,
        imagen: 'https://res.cloudinary.com/du4tcug9q/image/upload/v1763726311/image-habitation_mmy7ly.png',
        titulo: 'Centro Histórico',
        descripcion: 'Moteles con encanto en el corazón de la ciudad, cerca de todo.'
      },
      {
        id: 12,
        imagen: 'https://res.cloudinary.com/du4tcug9q/image/upload/v1763726311/image-habitation_mmy7ly.png',
        titulo: 'Zona Norte',
        descripcion: 'Modernos moteles con la mejor tecnología y servicios.'
      }
    ];
  }
}