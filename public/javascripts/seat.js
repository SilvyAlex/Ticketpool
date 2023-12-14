console.log("si esta corriendo");
document.addEventListener('DOMContentLoaded', function () {
    const seatsContainer = document.querySelectorAll('.seats input[type="checkbox"]');
    const tableBody = document.querySelector('#tabla-entradas tbody');
    const cantidadGeneralCell = document.getElementById('cantidad-general');
    const subtotalCell = document.getElementById('subtotal');
    let cantidadGeneral = 0;
    let subtotal = 0;

    seatsContainer.forEach((seatCheckbox) => {
        seatCheckbox.addEventListener('change', function () {
            const seatLabel = this.nextElementSibling;
            const seatNumber = seatLabel.textContent;
            const seatPrice = 20; // Precio para todas las localidades

            if (this.checked) {
                // Incrementar cantidad y subtotal
                cantidadGeneral++;
                subtotal += seatPrice;

                // Actualizar la tabla
                cantidadGeneralCell.textContent = cantidadGeneral;
                subtotalCell.textContent = `$${subtotal}`;

                // Agregar el asiento seleccionado a la tabla
                addSeatToTable(seatNumber, seatPrice);
            } else {
                // Decrementar cantidad y subtotal
                cantidadGeneral--;
                subtotal -= seatPrice;

                // Actualizar la tabla
                cantidadGeneralCell.textContent = cantidadGeneral;
                subtotalCell.textContent = `$${subtotal}`;

                // Eliminar el asiento deseleccionado de la tabla
                removeSeatFromTable(seatNumber);
            }
        });
    });

    function addSeatToTable(seatNumber, seatPrice) {
        const row = document.createElement('tr');
        const seatCell = document.createElement('td');
        const priceCell = document.createElement('td');
        const quantityCell = document.createElement('td');

        seatCell.textContent = seatNumber;
        priceCell.textContent = `$${seatPrice}`;
        quantityCell.textContent = '1'; // Assuming you always add one seat at a time

        row.appendChild(seatCell);
        row.appendChild(priceCell);
        row.appendChild(quantityCell);

        tableBody.appendChild(row);
    }

    function removeSeatFromTable(seatNumber) {
        const rows = tableBody.getElementsByTagName('tr');

        // Loop through rows and remove the row with the matching seatNumber
        for (let i = 0; i < rows.length; i++) {
            const cells = rows[i].getElementsByTagName('td');
            if (cells[0].textContent === seatNumber) {
                tableBody.removeChild(rows[i]);
                break;
            }
        }
    }
});