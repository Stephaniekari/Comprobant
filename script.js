document.addEventListener("DOMContentLoaded", function () {
    let comprobanteNumero = parseInt(localStorage.getItem('comprobanteNumero')) || 1;
    const form = document.getElementById("comprobanteForm");
    const comprobanteDiv = document.getElementById("comprobante");
    const buscarNumero = document.getElementById("buscarNumero");
    const buscarComprobanteBtn = document.getElementById("buscarComprobante");

    // Cargar comprobantes desde localStorage
    let comprobantes = JSON.parse(localStorage.getItem('comprobantes')) || [];

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita el comportamiento por defecto del formulario

        const nombre = document.getElementById("nombre").value;
        const direccion = document.getElementById("direccion").value;
        const telefono = document.getElementById("telefono").value;
        const dpi = document.getElementById("dpi").value;
        const producto = document.getElementById("producto").value;
        const marca = document.getElementById("marca").value;
        const anticipo = document.getElementById("anticipo").value;
        const recibidoPor = document.getElementById("recibidoPor").value;

        // Validar los campos antes de guardar
        if (!nombre || !direccion || !telefono || !dpi || !producto || !marca || !anticipo || !recibidoPor) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        const comprobante = {
            numero: comprobanteNumero,
            nombre: nombre,
            direccion: direccion,
            telefono: telefono,
            dpi: dpi,
            producto: producto,
            marca: marca,
            anticipo: anticipo,
            recibidoPor: recibidoPor
        };

        // Guardar comprobante en el array y en localStorage
        comprobantes.push(comprobante);
        localStorage.setItem('comprobantes', JSON.stringify(comprobantes));

        // Mostrar comprobante
        mostrarComprobante(comprobante);

        // Incrementar el número de comprobante para el próximo
        comprobanteNumero++;
        localStorage.setItem('comprobanteNumero', comprobanteNumero);

        // Limpiar el formulario
        form.reset();
    });

    buscarComprobanteBtn.addEventListener("click", function () {
        const numero = buscarNumero.value;
        const comprobante = comprobantes.find(c => c.numero == numero);

        if (comprobante) {
            mostrarComprobante(comprobante);
        } else {
            alert("No se encontró un comprobante con ese número.");
        }
    });

    function mostrarComprobante(comprobante) {
        document.getElementById("numComprobante").textContent = comprobante.numero;
        document.getElementById("nombreComprobante").textContent = comprobante.nombre;
        document.getElementById("direccionComprobante").textContent = comprobante.direccion;
        document.getElementById("telefonoComprobante").textContent = comprobante.telefono;
        document.getElementById("dpiComprobante").textContent = comprobante.dpi;
        document.getElementById("productoComprobante").textContent = comprobante.producto;
        document.getElementById("marcaComprobante").textContent = comprobante.marca;
        document.getElementById("anticipoComprobante").textContent = comprobante.anticipo;
        document.getElementById("recibidoPorComprobante").textContent = comprobante.recibidoPor;

        comprobanteDiv.classList.remove("hidden");
    }

    document.getElementById("imprimir").addEventListener("click", function () {
        window.print();
    });
});
