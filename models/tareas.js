const Tarea = require('./tarea');

class Tareas {
	_listado = {}


	get listadoArr() {
		const listado = [];

		Object.keys(this._listado).forEach( key => {
			listado.push(this._listado[key]);
		})

		return listado;
	}

	constructor() {
		this._listado = {};
	}

	borrarTarea(id = '') {
		if (this._listado[id]) {
			delete this._listado[id];
		}
	}

	cargarTareasFromArray(tareas = []) {
		tareas.forEach(tarea => {
			this._listado[tarea.id] = tarea;
		})
	}

	crearTarea(desc  = '') {
		const tarea = new Tarea(desc);
		this._listado[tarea.id] = tarea;
	}

	listadoCompleto() {
		this.imprimirRespuesta(this.listadoArr);
	}

	listarPendientesCompletadas(completas = true) {
		let tareas = [];
		tareas  = this.listadoArr.filter(tarea => {
			if (completas) {
				return tarea.compleadoEn !== null
			} else {
				return tarea.compleadoEn === null
			}
		});

		this.imprimirRespuesta(tareas);
	}

	imprimirRespuesta(tareas = []) {
		tareas.forEach((tarea, index) => {
			const indice = `${index + 1}`.green
			console.log(`${indice} ${tarea.desc} :: ${ (tarea.compleadoEn !== null) ? 'Completo'.green : 'Incompleto'.red }`);
		})
	}

	toggleCompletadas(ids = []) {
		ids.forEach(id => {
			const tarea  = this._listado[id];

			if (!tarea.compleadoEn) {
				tarea.compleadoEn = new Date().toISOString();
			}
		});

		this.listadoArr.forEach(tarea => {
			if (!ids.includes(tarea.id)) {
				this._listado[tarea.id].compleadoEn = null;
			}
		})
	}
}

module.exports = Tareas;