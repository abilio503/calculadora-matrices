let matriz = [];

function crearMatriz() {
    let size = document.getElementById("size").value;
    let container = document.getElementById("matriz-container");
    container.innerHTML = "";
    matriz = [];

    let tabla = document.createElement("table");
    for (let i = 0; i < size; i++) {
        let fila = document.createElement("tr");
        matriz.push([]);
        for (let j = 0; j < size; j++) {
            let celda = document.createElement("td");
            let input = document.createElement("input");
            input.type = "number";
            input.value = Math.floor(Math.random() * 10); // Valores aleatorios
            input.id = `celda-${i}-${j}`;
            matriz[i].push(input.value);
            celda.appendChild(input);
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    container.appendChild(tabla);
}

function obtenerMatriz() {
    let size = matriz.length;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            matriz[i][j] = parseFloat(document.getElementById(`celda-${i}-${j}`).value);
        }
    }
}

function obtenerMenor(matriz, fila, columna) {
    return matriz
        .filter((_, i) => i !== fila)
        .map(row => row.filter((_, j) => j !== columna));
}

function calcularDet(matriz, profundidad = 0) {
    let pasos = "";
    let size = matriz.length;

    if (size === 1) return matriz[0][0];

    if (size === 2) {
        let det = matriz[0][0] * matriz[1][1] - matriz[0][1] * matriz[1][0];
        pasos += `(${matriz[0][0]} * ${matriz[1][1]}) - (${matriz[0][1]} * ${matriz[1][0]}) = ${det}<br>`;
        return { det, pasos };
    }

    let determinante = 0;
    for (let j = 0; j < size; j++) {
        let menor = obtenerMenor(matriz, 0, j);
        let { det: subDet, pasos: subPasos } = calcularDet(menor, profundidad + 1);
        let cofactor = (j % 2 === 0 ? 1 : -1) * matriz[0][j] * subDet;
        determinante += cofactor;
        pasos += `Cofactor ${matriz[0][j]} * det(${JSON.stringify(menor)}) = ${cofactor}<br>`;
        pasos += subPasos;
    }

    return { det: determinante, pasos };
}

function calcularDeterminante() {
    obtenerMatriz();
    let { det, pasos } = calcularDet(matriz);
    document.getElementById("resultado").innerHTML = `<h3>Determinante: ${det}</h3>`;
    document.getElementById("pasos").innerHTML = `<h4>Pasos:</h4>${pasos}`;
}

