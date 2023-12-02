// controllers/productController.js
const UPH = require('../models/uph');
const CsvParser = require("json2csv").Parser;

const getUPHByMC = (req, res) => {
  let plant =  req.params.plant;
  const lastDate =  req.params.lastDate;
  const byModel= req.params.byModel;
  //console.log(byModel);
  UPH.uphByMC(plant,byModel,lastDate,(error, result) => {
    if (error) {
      return res.status(500).json({ message: 'Error getting uph' });
    }
    return res.json(result);
  });
};

const getUPHByBom = (req, res) => {
  const plant =  req.params.plant;
  const lastDate =  req.params.lastDate;
  const mc= req.params.mc;
  
  console.log('uph_by_bom');
  UPH.uphByBom(mc,plant,lastDate,(error, result) => {
    if (error) {
      return res.status(500).json({ message: 'Error getting uph' });
    }
    return res.json(result);
  });
};

const getUPHByPkg = (req, res) => {
  const plant =  req.params.plant;
  const lastDate =  req.params.lastDate;
  const mc= req.params.mc;
  
  console.log('pcakage');
  UPH.uphByPkg(mc,plant,lastDate,(error, result) => {
    if (error) {
      return res.status(500).json({ message: 'Error getting uph' });
    }
    return res.json(result);
  });
};


const downloadUPHByMC = (req, res) => {
  const plant =  req.params.plant;
  const lastDate =  req.params.lastDate;
  const byModel= req.params.byModel;
  UPH.uphByMC(plant,byModel,lastDate,(error, result) => {
    if (error) {
      res.status(500).json({ message: 'Error getting uph' });
    }
    let dataRows = [];
    result.forEach((obj) => {
      // const { machine, model, uphAverage, uphMin, uphMax,bomRun,packageRun,plant } = obj;
      dataRows.push(obj);
    });
    const csvFields = ["machine", "model", "uphAverage", "uphMin", "uphMax","bomRun","packageRun","plant"];
    const csvParser = new CsvParser({ csvFields });
    const csvData = csvParser.parse(dataRows);

    res.setHeader("Content-Type", "text/csv");

    let basefname = `uph_by_mc_${getCurrentDateTime()}.csv`;
    // if(plant === undefined && byModel === undefined && lastDate === undefined){
    //   basefname = `uph_all_${basefname}`;
    // }
    // else if(byModel === undefined && plant === undefined){
    //   basefname = `uph_last_${lastDate}_day_${basefname}`;
    // }
    // else if(byModel === undefined){
    //   basefname = `uph_${plant}_last_${lastDate}_day_${basefname}`;
    // }
    // else{
    //   basefname = `uph_${plant}_${byModel}_last_${lastDate}_day_${basefname}`;
    // }


    res.setHeader("Content-Disposition", `attachment; filename=${basefname}`);

    res.status(200).end(csvData);
  });


  function getCurrentDateTime() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const formattedDateTime = `${year}${month}${day}${hours}${minutes}`;
    return formattedDateTime;
}
};

const downloadUPHByBom = (req, res) => {

  const plant =  req.params.plant;
  const lastDate =  req.params.lastDate;
  const mc= req.params.mc;
  
  console.log('uph_by_bom');
  UPH.uphByBom(mc,plant,lastDate,(error, result) => {
    if (error) {
      return res.status(500).json({ message: 'Error getting uph' });
    }
    let dataRows = [];
    result.forEach((obj) => {
      // const { machine, model, uphAverage, uphMin, uphMax,bomRun,packageRun,plant } = obj;
      dataRows.push(obj);
    });
    const csvFields = ["bom", "package", "model", "uphAverage", "uphMin", "uphMax", "plant"];
    const csvParser = new CsvParser({ csvFields });
    const csvData = csvParser.parse(dataRows);

    res.setHeader("Content-Type", "text/csv");

    let basefname = `uph_by_bom_${getCurrentDateTime()}.csv`;
    res.setHeader("Content-Disposition", `attachment; filename=${basefname}`);

    res.status(200).end(csvData);
  });


  function getCurrentDateTime() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const formattedDateTime = `${year}${month}${day}${hours}${minutes}`;
    return formattedDateTime;
}
};

const downloadUPHByPkg = (req, res) => {

  const plant =  req.params.plant;
  const lastDate =  req.params.lastDate;
  const mc= req.params.mc;
  
  UPH.uphByPkg(mc,plant,lastDate,(error, result) => {
    if (error) {
      return res.status(500).json({ message: 'Error getting uph' });
    }
    let dataRows = [];
    result.forEach((obj) => {
      // const { machine, model, uphAverage, uphMin, uphMax,bomRun,packageRun,plant } = obj;
      dataRows.push(obj);
    });
    const csvFields = ["package", "model", "uphAverage", "uphMin", "uphMax", "plant"];
    const csvParser = new CsvParser({ csvFields });
    const csvData = csvParser.parse(dataRows);

    res.setHeader("Content-Type", "text/csv");

    let basefname = `uph_by_pkg_${getCurrentDateTime()}.csv`;
    res.setHeader("Content-Disposition", `attachment; filename=${basefname}`);

    res.status(200).end(csvData);
  });


  function getCurrentDateTime() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    const formattedDateTime = `${year}${month}${day}${hours}${minutes}`;
    return formattedDateTime;
}
};



module.exports = {
  getUPHByMC,
  getUPHByBom,
  getUPHByPkg,
  downloadUPHByMC,
  downloadUPHByBom,
  downloadUPHByPkg
};
