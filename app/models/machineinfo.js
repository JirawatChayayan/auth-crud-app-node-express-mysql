const pool = require('../utils/database');

class MachineInfo{
    static machineModel(callback){
        const query = `
           SELECT DISTINCT UPPER(SUBSTRING(A.MC_NAME,1,9)) AS model 
           FROM machine_monitoring A 
           WHERE A.MC_NAME like "THEIA%"
           ORDER BY A.MC_NAME
        `;
        pool.query(query, (error, results) => {
        if (error) {
          return callback(error, null);
        }
        return callback(null, results);
      });
    }

    static machineinfo(callback){
        const query = `
        SELECT  A.PLANT as plant,
                A.MC_NAME as machine,
                UPPER(SUBSTRING(A.MC_NAME,1,9)) AS model,
                A.IP_ADDRESS as ipAddress,
                A.MAC_ADDRESS as macAddress,
                A.UPDATE_DATE as updateDate
        FROM machine_monitoring A 
        WHERE A.MC_NAME like "THEIA%" AND A.PLANT is not null
        ORDER BY A.PLANT,A.MC_NAME;
        `;
        pool.query(query, (error, results) => {
        if (error) {
          return callback(error, null);
        }
        return callback(null, results);
      });
    }

    static machineIsFlow3opt (plant,callback){
      if(plant === undefined){
        return callback(true, null);
      }
      const plantInCaptial = plant.toString().toUpperCase().trim();
      if(!(plantInCaptial === "UTL1" || plantInCaptial === "UTL2" || plantInCaptial === "UTL3")){
        return callback(true, null);
      }

      let query = `
            SELECT 

              CASE
                WHEN A.Is_Auto3OPTFlow = 1 THEN 'true'
                WHEN A.Is_Auto3OPTFlow = 0 THEN 'false'
                ELSE NULL
              END as flow,
              COUNT(DISTINCT A.LotNo) as lotCount
            FROM 
              uphrawdata A 
            INNER JOIN 
              machine_monitoring B
            ON 
              A.Machine = B.MC_NAME
            WHERE 
              B.PLANT = '${plantInCaptial}'
            GROUP BY 
              A.Is_Auto3OPTFlow;
        `;
        pool.query(query,[], (error, results) => {
        if (error) {
          return callback(error, null);
        }
        
        return callback(null, this.checkdata(results));
      });
    }

    static checkdata(result)
    {
      //console.log(result);
      let a = [];
      result.forEach(ele=>{      
        ele['flow'] = (ele['flow'] === 'true');
        a.push(ele);
      });
      
      if(a.length == 1){
        a.push({
          flow : !a[0].flow,
          lotCount : 0
        });
      }
      else if(a.length == 0){
        a.push({
          flow : true,
          lotCount : 0
        });
        a.push({
          flow : false,
          lotCount : 0
        });
      }
      return a;
    }

}
module.exports = MachineInfo;