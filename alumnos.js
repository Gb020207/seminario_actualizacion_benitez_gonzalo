const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(pregunta) {
  return new Promise(resolve => rl.question(pregunta, resolve));
}

let alumnos = [];

function buscarAlumno(nombre) {
  return alumnos.find(a => a[0].toLowerCase() === nombre.toLowerCase());
}

async function agregarAlumno() {
  let nombre = await prompt("Nombre del alumno: ");
  let existente = buscarAlumno(nombre);

  if (existente) {
    console.log("El alumno ya existe.");
    await gestionarMaterias(existente);
    return;
  }

  let materias = [];
  let cantidad = parseInt(await prompt("¿Cuántas materias?: "));

  for (let i = 0; i < cantidad; i++) {
    let materia = await prompt("Materia: ");
    let nota = parseFloat(await prompt("Nota: "));
    materias.push([materia, nota]);
  }

  alumnos.push([nombre, materias]);
  console.log("Alumno agregado.");
}

async function gestionarMaterias(alumno) {
  let materia = await prompt("Ingrese materia: ");

  let existente = alumno[1].find(m => m[0].toLowerCase() === materia.toLowerCase());

  if (existente) {
    console.log("Nota actual:", existente[1]);
    existente[1] = parseFloat(await prompt("Nueva nota: "));
    console.log("Nota actualizada.");
  } else {
    console.log("Materia no existe. Se agregará.");
    let nota = parseFloat(await prompt("Nota: "));
    alumno[1].push([materia, nota]);
  }
}

function mostrarAlumnos() {
  if (alumnos.length === 0) {
    console.log("No hay alumnos.");
    return;
  }

  alumnos.forEach(alumno => {
    console.log("\nAlumno:", alumno[0]);
    let suma = 0;

    alumno[1].forEach(m => {
      console.log(`  ${m[0]}: ${m[1]}`);
      suma += m[1];
    });

    let promedio = suma / alumno[1].length;
    console.log("  Promedio:", promedio.toFixed(2));
  });
}

function mejorPromedio() {
  let mejor = null;
  let mejorProm = 0;

  alumnos.forEach(alumno => {
    let suma = alumno[1].reduce((acc, m) => acc + m[1], 0);
    let prom = suma / alumno[1].length;

    if (prom > mejorProm) {
      mejorProm = prom;
      mejor = alumno[0];
    }
  });

  if (mejor) {
    console.log(`Mejor alumno: ${mejor} con promedio ${mejorProm.toFixed(2)}`);
  }
}

async function menu() {
  while (true) {
    console.log("\n1. Ver alumnos");
    console.log("2. Agregar alumno");
    console.log("3. Agregar o modificar notas");
    console.log("4. Mejor promedio");
    console.log("5. Salir");

    let op = await prompt("Opción: ");

    switch (op) {
      case "1":
        mostrarAlumnos();
        break;
      case "2":
        await agregarAlumno();
        break;
      case "3":
        let nombre = await prompt("Nombre del alumno: ");
        let alumno = buscarAlumno(nombre);
        if (alumno) await gestionarMaterias(alumno);
        else console.log("Alumno no encontrado.");
        break;
      case "4":
        mejorPromedio();
        break;
      case "5":
        rl.close();
        return;
      default:
        console.log("Opción inválida.");
    }
  }
}

menu();