const { pool } = require("./conexionDB");

class DatosService {
  async consulta(data) {
    console.log(data);

    const { parametro1, parametro2 } = data;

    console.log(parametro1);
    console.log(parametro2);

/*     let servicio; */
    let query = `
        select * from tbl_equipos te 
    `;

    if (parametro1 !== "TODOS") {
/*       servicio = parametro1; */
      query += `where te.servicio = '${parametro1}'`;
    }

    const res_consulta = await pool.query(query);

    return res_consulta.rows;
  }
  async contratos (equipoId){
    console.log("No llega",equipoId)
    const ctr = equipoId;
    
    let query ={
      text:`
      select arch_contrato from tbl_contratos 
      where equipo_id = $1`,
      values: [ctr]
    } ;

    const res_contrato = await pool.query(query);
    return res_contrato.rows;
  }

}

module.exports = DatosService;
