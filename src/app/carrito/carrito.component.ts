import { Component } from '@angular/core';
import { ServiceService } from '../service/service.service';

declare var ePayco: any; // Declarar ePayco como una variable global

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  products: any[] = [];
  totalPrice: number = 0;

  doc_number: string = '';
  name: string = '';
  last_name: string = '';
  email: string = '';
  cell_phone: string = '';

  constructor(private cartService: ServiceService) {
    this.cartService.cart$.subscribe(products => {
      this.products = products.map(product => ({
        ...product,
        cantidad: product.cantidad || 1,
        subtotal: (product.cantidad || 1) * product.precio
      }));
      this.calculateTotalPrice();
    });
  }

  removeFromCart(product: any) {
    this.cartService.removeFromCart(product);
    this.calculateTotalPrice(); // Recalcular el precio total después de eliminar
  }

  incrementQuantity(product: any) {
    product.cantidad++;
    product.subtotal = product.cantidad * product.precio;
    this.calculateTotalPrice();
  }

  decrementQuantity(product: any) {
    if (product.cantidad > 1) {
      product.cantidad--;
      product.subtotal = product.cantidad * product.precio;
      this.calculateTotalPrice();
    }
  }

  calculateTotalPrice() {
    this.totalPrice = this.products.reduce((total, product) => total + product.subtotal, 0);
  }

  pay() {
    const handler = ePayco.checkout.configure({
      key: '0db9fdb7fdef593fc398efc8439ea9bc',
      test: false // Cambia a false para producción
    });

    const data = {
      amount: this.totalPrice.toString(),
      description: 'Pago de carrito de compras',
      currency: 'COP',
      name: this.name.length > 4 ? this.name : 'NombreGenerico', // Asegúrate de que el nombre tenga más de 4 letras
      last_name: this.last_name,
      email: this.email,
      doc_number: this.doc_number,
      cell_phone: this.cell_phone
    };

    console.log(data);
    handler.open(data);

    // Manejar eventos después de abrir el formulario
    handler.on('transaction_completed', (response: any) => {
      console.log('Pago exitoso', response);

      const paymentData = {
        amount: data.amount,
        description: data.description,
        currency: data.currency,
        email: data.email,
        doc_number: data.doc_number,
        name: data.name,
        last_name: data.last_name,
        cell_phone: data.cell_phone
      };

      this.cartService.createPayment(paymentData).subscribe(
        res => {
          console.log('Pago procesado en backend', res);
          // Redirigir al usuario a WhatsApp después de procesar el pago
          window.location.href = 'https://wa.me/3004814669';
        },
        err => console.error('Error al procesar el pago en backend', err)
      );
    });
  }
}
