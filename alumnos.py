alumnos = []

def buscar_alumno(nombre):
    for alumno in alumnos:
        if alumno[0].lower() == nombre.lower():
            return alumno
    return None

def agregar_alumno():
    nombre = input("Nombre del alumno: ")
    existente = buscar_alumno(nombre)

    if existente:
        print("El alumno ya existe.")
        gestionar_materias(existente)
        return

    materias = []
    cantidad = int(input("¿Cuántas materias desea cargar?: "))

    for _ in range(cantidad):
        materia = input("Nombre de la materia: ")
        nota = float(input("Nota: "))
        materias.append([materia, nota])

    alumnos.append([nombre, materias])
    print("Alumno agregado.")

def gestionar_materias(alumno):
    materia = input("Ingrese materia: ")

    for m in alumno[1]:
        if m[0].lower() == materia.lower():
            print("Materia encontrada. Nota actual:", m[1])
            m[1] = float(input("Nueva nota: "))
            print("Nota actualizada.")
            return

    print("Materia no existe. Se agregará.")
    nota = float(input("Nota: "))
    alumno[1].append([materia, nota])

def mostrar_alumnos():
    if not alumnos:
        print("No hay alumnos.")
        return

    for alumno in alumnos:
        print("\nAlumno:", alumno[0])
        suma = 0
        for materia in alumno[1]:
            print(f"  {materia[0]}: {materia[1]}")
            suma += materia[1]

        promedio = suma / len(alumno[1])
        print("  Promedio:", round(promedio, 2))

def mejor_promedio():
    mejor = None
    mejor_prom = 0

    for alumno in alumnos:
        suma = sum(m[1] for m in alumno[1])
        prom = suma / len(alumno[1])

        if prom > mejor_prom:
            mejor_prom = prom
            mejor = alumno[0]

    if mejor:
        print(f"Mejor alumno: {mejor} con promedio {round(mejor_prom,2)}")

def menu():
    while True:
        print("\n1. Ver alumnos")
        print("2. Agregar alumno")
        print("3. Agregar o modificar notas")
        print("4. Mejor promedio")
        print("5. Salir")

        op = input("Opción: ")

        if op == "1":
            mostrar_alumnos()
        elif op == "2":
            agregar_alumno()
        elif op == "3":
            nombre = input("Nombre del alumno: ")
            alumno = buscar_alumno(nombre)
            if alumno:
                gestionar_materias(alumno)
            else:
                print("Alumno no encontrado.")
        elif op == "4":
            mejor_promedio()
        elif op == "5":
            break
        else:
            print("Opción inválida.")

menu()