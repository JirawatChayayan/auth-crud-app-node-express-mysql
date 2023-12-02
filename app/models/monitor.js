const pool = require('../utils/database');

class Monitor{
    static getMonitoring(callback){
        const query = `
                SELECT 
                    A.PLANT as plant,
                    A.MC_NAME as mcName,
                    A.HOST_NAME as hostName,
                    A.IP_ADDRESS as ipAddress,
                    A.MAC_ADDRESS as macAddress,
                    A.MACHINE_STATUS as machineStatus,
                    A.UPDATE_DATE as updateDate

                FROM machine_monitoring A 
                WHERE A.PLANT is not null and A.UPDATE_DATE >= ADDDATE(CURDATE(),-5)
                    ORDER BY A.PLANT,A.MC_NAME
        `;

        pool.query(query,[], (error, results) => {
            if (error) {
              return callback(error, null);
            }
            return callback(null, results);
        });
    }
}

module.exports = Monitor;