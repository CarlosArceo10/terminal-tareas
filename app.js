require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, confirmar, leerInput, listadoTareasBorrar, mostrarListadoCheckList } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const mail = async() => {
    let opt = ''
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {

        // Imprimir el menú
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // Crear opcion
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc)
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas();
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr);

                tareas.toggleCompletadas(ids);
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                
                if (id !== '0') {
                    const ok = await confirmar('¿Estás seguro?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada correctamente.'.grey);
                    }
                }
                break;
            default:
                break;
        }

        guardarDB( tareas.listadoArr )

        await pausa();

    } while ( opt !== '0');
}

mail();