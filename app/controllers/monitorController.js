const Monitor = require('../models/monitor');


const getMonitoring=(req,res)=>{
    console.log('monitor');
    Monitor.getMonitoring((error, result)=>{
        if(error){
            return res.status(500).json({ message: 'Error getting monitordata' });
        }
        else{
            return res.json(result);
        }
    });
}

module.exports = {
    getMonitoring
};