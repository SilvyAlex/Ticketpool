console.log("si esta corriendo");
document.addEventListener('DOMContentLoaded', function () {
    const seatsContainer = document.querySelectorAll('.seats input[type="checkbox"]');
    const tableBody = document.querySelector('#tabla-entradas tbody');
    const cantidadGeneralCell = document.getElementById('cantidad-general');
    const subtotalCell = document.getElementById('subtotal');
    let cantidadGeneral = 0;
    let subtotal = 0;

    // Recuperar datos almacenados en localStorage
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')) || [];

    // Restaurar los asientos seleccionados desde localStorage
    selectedSeats.forEach((seatNumber) => {
        const seatCheckbox = document.getElementById(seatNumber);
        if (seatCheckbox) {
            seatCheckbox.checked = true;
            addSeatToTable(seatNumber, 20); // Asumiendo un precio fijo de $20 por asiento
        }
    });

    // Actualizar la tabla y los contadores
    updateTable();

    seatsContainer.forEach((seatCheckbox) => {
        seatCheckbox.addEventListener('change', function () {
            const seatLabel = this.nextElementSibling;
            const seatNumber = seatLabel.textContent;
            const seatPrice = 20; // Precio para todas las localidades

            if (this.checked) {
                // Incrementar cantidad y subtotal
                cantidadGeneral++;
                subtotal += seatPrice;

                // Agregar el asiento seleccionado a la tabla
                addSeatToTable(seatNumber, seatPrice);

                // Actualizar datos en localStorage
                selectedSeats.push(seatNumber);
                localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
            } else {
                // Decrementar cantidad y subtotal
                cantidadGeneral--;
                subtotal -= seatPrice;

                // Eliminar el asiento deseleccionado de la tabla
                removeSeatFromTable(seatNumber);

                // Actualizar datos en localStorage
                const index = selectedSeats.indexOf(seatNumber);
                if (index !== -1) {
                    selectedSeats.splice(index, 1);
                    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
                }
            }

            // Actualizar la tabla y los contadores
            updateTable();
        });
    });

    function addSeatToTable(seatNumber, seatPrice) {
        const row = document.createElement('tr');
        const seatCell = document.createElement('td');
        const priceCell = document.createElement('td');
        const quantityCell = document.createElement('td');

        seatCell.textContent = seatNumber;
        priceCell.textContent = `$${seatPrice}`;
        quantityCell.textContent = '1'; // Asumiendo que siempre se agrega un asiento a la vez

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

    function updateTable() {
        // Actualizar la tabla y los contadores
        cantidadGeneralCell.textContent = cantidadGeneral;
        subtotalCell.textContent = `$${subtotal}`;
    }
});