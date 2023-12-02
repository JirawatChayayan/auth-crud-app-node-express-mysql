const MachineInfo = require('../models/machineinfo.js')

const getMcModel=(req,res)=>{
  MachineInfo.machineModel((error,result) =>{

    if (error) {
      return res.status(500).json({ message: 'Error getting machine model' });
    }
    let res_list = [];
    result.forEach(element => {
      console.log(element['model']);
      res_list.push(element['model']);
    });
    return res.json(res_list);
  });
};

const getMcInfo=(req,res)=>{
  MachineInfo.machineinfo((error,result) =>{

    if (error) {
      return res.status(500).json({ message: 'Error getting machine info' });
    }
    return res.json(result);
  });
};

const getMclist=(req,res)=>{
    MachineInfo.machineinfo((error,result) =>{
  
      if (error) {
        return res.status(500).json({ message: 'Error getting machine info' });
      }
      let res_list = [];
      result.forEach(element => {
        res_list.push(element['machine']);
      });

      return res.json(res_list.sort());
    });
  };

const getMcIsflow=(req,res)=>{
  const plant = req.params.plant;
  console.log(plant);
  MachineInfo.machineIsFlow3opt(plant,(error,result) =>{
    if (error) {
      return res.status(500).json({ message: 'Error getting machine info' });
    }
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
    return res.json(a);
  });
};

const getMcIsFlow3Plant = async (req, res) => {
  const result_data = [];

  try {
    const getMachineInfo = async (plant) => {
      return new Promise((resolve, reject) => {
        MachineInfo.machineIsFlow3opt(plant, (error, result) => {
          if (error) {
            reject(`Error getting machine info for ${plant}`);
          } else {
            resolve({ plant, data: result });
          }
        });
      });
    };

    const plants = ['utl1', 'utl2', 'utl3'];

    for (const plant of plants) {
      const machineInfo = await getMachineInfo(plant);
      result_data.push(machineInfo);
    }

    return res.json(result_data);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
}


module.exports = {
  getMcModel,
  getMcInfo,
  getMclist,
  getMcIsFlow3Plant
};