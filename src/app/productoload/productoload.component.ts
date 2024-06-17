import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productoload',
  templateUrl: './productoload.component.html',
  styleUrls: ['./productoload.component.css']
})
export class ProductoloadComponent implements OnInit {
  selectedFile: File | null = null;
  imagenSeleccionada: File | null = null;
  imagenSeleccionadaURL: string | null = null;

  producto: any = {
    nombre: '',
    descripcion: '',
    precio: 0,
    categoria: ''
  };

  constructor(private productService: ServiceService) {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.imagenSeleccionada) {
      console.error('Debe seleccionar una imagen');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', this.producto.nombre);
    formData.append('descripcion', this.producto.descripcion);
    formData.append('precio', this.producto.precio.toString());
    formData.append('imagen', this.imagenSeleccionada);
    formData.append('categoria', this.producto.categoria);

    this.productService.createProduct(formData).subscribe(
      response => {
        console.log('Producto creado exitosamente:', response);
        Swal.fire({
          icon: 'success',
          title: 'Producto creado exitosamente',
          confirmButtonColor: '#FCCB55',
        });
        // Limpiar campos después de crear el producto
        this.clearFields();
      },
      error => {
        console.error('Error al crear producto:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al crear producto',
          text: 'No se ha podido crear el producto',
          confirmButtonColor: '#FCCB55',
        });
      }
    );
  }

  onFileSelected(event: any) {
    this.imagenSeleccionada = event.target.files[0];
    if (this.imagenSeleccionada) {
      this.imagenSeleccionadaURL = URL.createObjectURL(this.imagenSeleccionada);
    }
  }

  clearFields() {
    this.producto.nombre = '';
    this.producto.descripcion = '';
    this.producto.precio = 0;
    this.producto.categoria = '';
    this.imagenSeleccionada = null;
    this.imagenSeleccionadaURL = null;
  }
}
