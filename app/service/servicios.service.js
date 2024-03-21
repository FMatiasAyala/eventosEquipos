const {pool} = require('./conexionDB')


class ServiciosService {

    async servicios(data){
        try{
            let query 

            if (data && data.trim() !== '') {
                query = {
                    text: 'SELECT * FROM tbl_equipos te WHERE servicio ILIKE $1 or modelo ilike $1',
                    values: [`${data.trim()}%`],
                };   
            }else{
                query = {
                    text: 'SELECT * FROM tbl_equipos te',
                };
                
            }
                
            const servicios = await pool.query(query)
    
            return servicios.rows;
        }catch (error) {
        console.error('Error en el método servicios:', error);
        throw error; // Puedes manejar el error de otra manera según tus necesidades
    }
    }
   

}


module.exports = ServiciosService;