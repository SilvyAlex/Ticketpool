console.log("si esta corriendo");
document.addEventListener('DOMContentLoaded', function () {
    const seatsContainer = document.getElementById('tabla-entradas');
    const selectedSeatsContainer = document.getElementById('tabla-entradas');
    const cantidadGeneralCell = document.getElementById('cantidad-general');
    const subtotalCell = document.getElementById('subtotal');
    let cantidadGeneral = 0;
    let subtotal = 0;
    seatsContainer.addEventListener('change', function (event) {
    const seatCheckbox = event.target;
    if (seatCheckbox.tagName === 'INPUT' && seatCheckbox.type === 'checkbox') {
    const seatLabel = seatCheckbox.nextElementSibling;
    const seatNumber = seatLabel.textContent;
    const seatPrice = 20; // Precio para todas las localidades
    if (seatCheckbox.checked) {
    // Incrementar cantidad y subtotal
    cantidadGeneral++;
    subtotal += seatPrice;
    // Actualizar la tabla
    cantidadGeneralCell.textContent = cantidadGeneral;
    subtotalCell.textContent = `$${subtotal}`;
    } else {
    // Decrementar cantidad y subtotal
    cantidadGeneral--;
    subtotal -= seatPrice;
    // Actualizar la tabla
    cantidadGeneralCell.textContent = cantidadGeneral;
    subtotalCell.textContent = `$${subtotal}`;
    }
    }
    });
    });
