const express = require('express')
const {pool} = require('./conexionDB')
const moment = require('moment')



class EventosService {
    async eventos(data){

        try {
            let query


            if (data !== ''){
                query = {
                    text: 'select a.servicio as servicio  , a.marca as marca,  a.modelo as modelo, b.descripcion as descripcion,b.estado as estado, b.fecha_evento as fecha_evento, b.usuario as usuario, b.num_reporte as num_reporte from tbl_equipos a inner join tbl_eventos b on a.equipo_id = b.equipo_id where a.equipo_id = $1',
                    values: [data]
                };
    /*             query2 = {
                    text: 'SELECT * FROM tbl_equipos te WHERE equipo_id =$1',
                    values: [data.trim()]
                }; */
            }else {
                console.log ('No tiene nada')
            }
            const eventos = await pool.query(query)
            eventos.rows.forEach(evento => {
                evento.fecha_evento = moment(evento.fecha_evento).format('YYYY-MM-DD');
            });
    
            return eventos.rows;

        }catch(error){
            console.error('Error en el metodo eventos:', error)
            throw error;
        }
    }
    async agregarEquipo( operador, descripcion,estado , fecha_evento, id_equipo, marca, modelo, num_reporte) {
        try {
            // Realizar la inserción en la base de datos
            const query = {
                text: 'INSERT INTO tbl_eventos ( usuario, descripcion, fecha_evento,estado, equipo_id, marca, modelo, num_reporte) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
                values: [operador, descripcion, fecha_evento,estado, id_equipo, marca, modelo, num_reporte],
            };

            const resultado = await pool.query(query);

            // Devolver el nuevo equipo creado
            console.log(resultado.rows[0]);
        } catch (error) {
            console.error('Error al agregar equipo:', error);
            throw error;
        }
    }
}

module.exports = EventosService;