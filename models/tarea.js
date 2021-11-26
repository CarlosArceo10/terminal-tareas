const { v4: uudiv4 } = require('uuid');

class Tarea {
    id = '';
    desc = '';
    compleadoEn = null;

    constructor(desc) {
        this.id = uudiv4();
        this.desc = desc;
    }

}


module.exports = Tarea;