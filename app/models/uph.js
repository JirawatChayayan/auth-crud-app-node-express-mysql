const pool = require('../utils/database');

class UPH {
    static uphByMC(plant = "ALL",byModel ="ALL", lastdate = undefined, callback) {
        if(plant == undefined || plant == ""){
          plant = "ALL"
        }
        if(byModel == undefined || byModel == "ALL"){
          byModel = "ALL"
        }

        const byModelInCaptial = byModel.toUpperCase().trim();
        const plantInCaptial = plant.toUpperCase().trim();
        let additionalScript = `B.PLANT is not null`;

        if(lastdate !== undefined){
          additionalScript = `${additionalScript} AND A.UpdateDate >= ADDDATE(CURDATE(), -${lastdate}) `;
        }
        
        if(plantInCaptial === "UTL1" || plantInCaptial === "UTL2" || plantInCaptial === "UTL3"){
            additionalScript = `${additionalScript} AND B.PLANT = '${plantInCaptial}'`;
        }
        if(byModelInCaptial == "THEIA1000" || byModelInCaptial == "THEIA2000" || byModelInCaptial == "THEIA3000"){

          additionalScript = `${additionalScript} AND UPPER(SUBSTRING(A.Machine,1,9)) = '${byModelInCaptial}'`;
        }


        let sqlQuery = `
            SELECT
              A.Machine as machine,
              UPPER(SUBSTRING(A.Machine,1,9)) AS model,
              CONVERT(ROUND(AVG(A.UPH),0),UNSIGNED INTEGER) AS uphAverage,
              MIN(A.UPH) AS uphMin,
              MAX(A.UPH) AS uphMax,
              COUNT(DISTINCT A.Bom) AS bomRun,
              COUNT(DISTINCT A.Package) AS packageRun,
              B.PLANT As plant
            FROM
              uphsummary A
            INNER JOIN
              machine_monitoring B ON A.Machine = B.MC_NAME
            WHERE
              @replacehere
            GROUP BY
              A.Machine;
        `;
      
      const query = sqlQuery.replace('@replacehere',additionalScript);
      console.log(query);
      
      pool.query(query,[], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        return callback(null, results);
      });
    }

    static uphByBom(mc,plant,lastdate = undefined,callback){

      let additionalScript = "B.PLANT is not null ";
      console.log('XXXX');
      const match1 = this.checkmatch(mc);
      const match2 = this.checkmatch(plant);
      const match3 = this.checkmatch(lastdate);

      if(lastdate !== undefined){
        if(!isNaN(lastdate)){
          additionalScript = `${additionalScript} AND A.UpdateDate >= ADDDATE(CURDATE(), -${lastdate}) `;
        }
      }

      if(match1[0] || match2[0] || match3[0])
      {
        console.log ('ismatch');
        let mcUpper = "";
        if(match1[0]){
          mcUpper = match1[1].toUpperCase().trim();
        }
        else if(match2[0]){
          mcUpper = match2[1].toUpperCase().trim();
        }
        else{
          mcUpper = match3[1].toUpperCase().trim();
        }
        additionalScript = `${additionalScript} AND A.Machine like '%${mcUpper}%'`;
      }
      else{
        if(plant !== undefined){
          const plantInCaptial = plant.toUpperCase().trim();
          if(plantInCaptial === "UTL1" || plantInCaptial === "UTL2" || plantInCaptial === "UTL3"){
            additionalScript = `${additionalScript} AND B.PLANT = '${plantInCaptial}'`;
          }
        }
      }


      let sqlQuery = `
                      SELECT
                        A.Bom as bom,
                        A.Package as package,
                        UPPER(SUBSTRING(A.Machine,1,9)) AS model,
                        CONVERT(ROUND(AVG(A.UPH),0),UNSIGNED INTEGER) AS uphAverage,
                        MIN(A.UPH) AS uphMin,
                        MAX(A.UPH) AS uphMax,
                        B.PLANT as plant
                      FROM
                        uphsummary A
                      INNER JOIN
                        machine_monitoring B ON A.Machine = B.MC_NAME
                      WHERE
                        @replacehere
                      GROUP BY
                        A.Bom
                      ORDER BY
                        A.Bom;

      `;
      const query = sqlQuery.replace('@replacehere',additionalScript);
      //console.log(query);
      pool.query(query,[], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        return callback(null, results);
      });
    }

    static uphByPkg(mc,plant,lastdate = undefined,callback){
      let additionalScript = "B.PLANT is not null ";
      console.log('XXXX2');
      const match1 = this.checkmatch(mc);
      const match2 = this.checkmatch(plant);
      const match3 = this.checkmatch(lastdate);

      if(lastdate !== undefined){
        if(!isNaN(lastdate)){
          additionalScript = `${additionalScript} AND A.UpdateDate >= ADDDATE(CURDATE(), -${lastdate}) `;
        }
      }

      if(match1[0] || match2[0] || match3[0])
      {
        console.log ('ismatch');
        let mcUpper = "";
        if(match1[0]){
          mcUpper = match1[1].toUpperCase().trim();
        }
        else if(match2[0]){
          mcUpper = match2[1].toUpperCase().trim();
        }
        else{
          mcUpper = match3[1].toUpperCase().trim();
        }
        additionalScript = `${additionalScript} AND A.Machine like '%${mcUpper}%'`;
      }
      else{
        if(plant !== undefined){
          const plantInCaptial = plant.toUpperCase().trim();
          if(plantInCaptial === "UTL1" || plantInCaptial === "UTL2" || plantInCaptial === "UTL3"){
            additionalScript = `${additionalScript} AND B.PLANT = '${plantInCaptial}'`;
          }
        }
      }

      let sqlQuery = `
                      SELECT
                        A.Package as package,
                        UPPER(SUBSTRING(A.Machine,1,9)) AS model,
                        CONVERT(ROUND(AVG(A.UPH),0),UNSIGNED INTEGER) AS uphAverage,
                        MIN(A.UPH) AS uphMin,
                        MAX(A.UPH) AS uphMax,
                        B.PLANT as plant
                      FROM
                        uphsummary A
                      INNER JOIN
                        machine_monitoring B ON A.Machine = B.MC_NAME
                      WHERE
                        @replacehere
                      GROUP BY
                        A.Package
                      ORDER BY
                        A.Package;

      `;
      const query = sqlQuery.replace('@replacehere',additionalScript);
      pool.query(query,[], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        return callback(null, results);
      });
    }

    static checkmatch(mc_check){
      // console.log(mc_check);
      if(mc_check === undefined){
        return [false,undefined];
      }
      const inputString = mc_check.toString().trim().toUpperCase();
      const pattern = /^THEIA(?:1000|2000|3000)-[0-9]{1,2}$/; 
      return [pattern.test(inputString),inputString];
    }
}
  
module.exports = UPH;