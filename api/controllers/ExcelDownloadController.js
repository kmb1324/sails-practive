/**
 * ExcelDownloadController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const Json2csvParser = require('json2csv').Parser;
const XLSX = require('xlsx');
module.exports = {
  downloadCSV: function(req, res){
    Soldiers.find().exec(function(err,users){
      if (err){
        sails.log.error(err)
        return res.send(500)
      }
      else{
        // convert to csv
        const fields = ['createdAt','name', 'age', 'gender'];
        const opts = { fields };
          try {
            const parser = new Json2csvParser(opts);
            console.log(users)
            const csv = parser.parse(users);
            const filename = "All_Users" + ".csv";
            res.attachment(filename)
            res.end(csv, 'UTF-8')
          } catch (err) {
            sails.log.error(err)
            return res.send(500)
          }

      }
    })
},
    downloadXLS: function(req, res){
      User.find().exec(function(err,users){
        if (err){
          sails.log.error(err)
          return res.send(500)
        }
        else {
          const ws = XLSX.utils.json_to_sheet(users);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "Main User Data");

          const buf = XLSX.write(wb, {type:'buffer', bookType:"xlsx"})
          filename = 'All_Users.xlsx'
          res.attachment(filename)
          res.status(200).send(buf);
        }
      })
    }
}
