const inquirer = require('inquirer');
const { pause } = require('./mensajes');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer',
        choices: [
            {
                value: '1',
                name: `${ '1.'.red } Crear tarea`
            },
            {
                value: '2',
                name: `${ '2.'.yellow } Listar tarea`
            },
            {
                value: '3',
                name: `${ '3.'.blue } Listar tareas completas`
            },
            {
                value: '4',
                name: `${ '4.'.green } Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${ '5.'.green } Completar tarea(s)`
            },
            {
                value: '6',
                name: `${ '6 '.green } Borrar tarea`
            },
            {
                value: '0',
                name: `${ '0.'.green } Salir \n`
            }
        ]
    }
];

const qPause =  {
        type: 'input',
        name: 'cerrar',
        message: `\nPrecione ${'Enter'.green} para continuar`
    }
;


const inquirerMenu = async() => {
    console.clear();
    console.log('Seleccione una opción del menú'.green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

const pausa = async() => {
    const { salir } = await inquirer.prompt(qPause);

    return salir;
}


const leerInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);

    return desc;
}

const listadoTareasBorrar = async(tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx =  `${i + 1}`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }   
    })

    choices.unshift({
        value: '0',
        name: '0.'.green + 'Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar', 
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);

    return id;

}

const mostrarListadoCheckList = async(tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx =  `${i + 1}`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.compleadoEn) ? true : false
        }
    })

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione', 
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta);

    return ids;

}


const confirmar = async(message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(question);

    return ok;
}
module.exports = {
    pausa,
    confirmar,
    leerInput,
    inquirerMenu,
    listadoTareasBorrar,
    mostrarListadoCheckList
}
