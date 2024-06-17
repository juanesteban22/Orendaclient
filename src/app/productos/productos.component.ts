import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  products: any[] = [];
  productRows: any[] = [];

  constructor(private productService: ServiceService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (response) => {
        this.products = response.productos;
        this.organizeProductsIntoRows();
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  addToCart(product: any) {
    this.productService.addToCart(product);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Producto agregado al carrito',
      showConfirmButton: false,
      timer: 1500
    });
  }

  removeProduct(product: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Eliminar producto de la lista local
        this.products = this.products.filter(p => p !== product);
        this.organizeProductsIntoRows();

        Swal.fire(
          'Eliminado!',
          'El producto ha sido eliminado.',
          'success'
        );
      }
    });
  }

  organizeProductsIntoRows(): void {
    const productsPerRow = 5;
    let rowIndex = 0;
    this.productRows = [];

    for (let i = 0; i < this.products.length; i += productsPerRow) {
      this.productRows[rowIndex] = this.products.slice(i, i + productsPerRow);
      rowIndex++;
    }
  }
}
