import { DataSource } from "typeorm";
import { Users } from "../dist/models/users.js";
import { Tracking} from "../dist/models/tracking.js";


//configuracion de la base de datos
//nuevamente esta hardcodeada pero deberian igualmente
//ser variables de entorno

export const AppDataSource= new DataSource({
    type: 'postgres',
    host: 'postgres_container',
    port:  5432,
    username: 'admin',
    password: 'admin',
    database: 'test',
    //esta opcion es para que se creen las tablas automaticamente, no seria en produccion pero es optimo para el esecenario de la prueba
    synchronize: true,
    entities:[Users,Tracking],
});