const Json2csvParser = require('json2csv').Parser;
const fs = require('fs');

module.exports = {
  testFunction: function(req, res) {
    console.log('HEY ITS KB!')
    return res.send({
      foo: 'var1',
      data: [1, 2, 3, 4]
    })
  },

  addUser: function(req, res) {
    const curName = req.param('name')
    const age = req.param('age')

    User.create({
      name: curName,
      age: age
    }).fetch().exec(function(err, user) {
      if (err) {
        sails.log.error(err)
        return res.send(500)
      }
      return res.send(user)
    })
  },

  getAllUsers: function(req, res) {
    User.find().exec(function(err, users) {
      if (err) {
        sails.log.error(err)
        return res.send(500)
      } else {
        return res.send(users)
      }
    })
  },

  addBulkZips: function(req, res) {
    var obj;
    fs.readFile("assets/zips.json", 'utf8', function(err, data) {
      if (err) {
        sails.log.error(err)
        return res.send(500)
      } else {
        objects = JSON.parse(data);

        var pop = 0;
        for (const index in objects) {

          pop = pop + objects[index].pop
          Cities.create({
            city: objects[index].city,
            pop: objects[index].pop,
            state: objects[index].state
          }).exec(function(err, data) {
            if (err) {
              sails.log.error(err)
            } else {
              console.log('Created City')
            }
          });
        }
        console.log('Done!')
        return res.status(200).send()
      }
    });
  },

  uploadGeneratedData: function(req, res) {
    var obj;
    fs.readFile("assets/generated.json", 'utf8', function(err, data) {
      if (err) {
        sails.log.error(err)
        return res.send(500)
      } else {
        objects = JSON.parse(data);

        for (const index in objects) {
          Soldiers.create({
            name: objects[index].name,
            age: objects[index].age,
            gender: objects[index].gender,
            registered: objects[index].registered,
            eyeColor: objects[index].eyeColor
          }).exec(function(err, data) {
            if (err) {
              sails.log.error(err)
            } else {
              console.log('Created User')
            }
          });
        }
        console.log('Done!')
        return res.status(200).send()
      }
    });
  },

  justForKicks: function(req, res) {
    const color = req.param('color')
    console.log(color.split(', '))
    Soldiers.find({where: {eyeColor: color.split(', ')}}).exec(function(err, soldiers) {
      if (err) {
        sails.log.error(err)
        return res.send(500)
      } else {
        // var color = []
        // var tmp = soldiers.forEach(function(value, index) {
        //   if (color.indexOf(value.eyeColor) === -1) {
        //     color.push(value.eyeColor)
        //   }
        // });
        console.log(soldiers.map(soldier => soldier.name))
        //console.log(soldiers)
        return res.send({
          eyeColor: color})
      //console.log(soldiers)
      //return res.send(soldiers)
      }
    });
  },

  getUserDates: function(req, res) {
    const name = req.param('name')
    Soldiers.find({
      name
    }).exec(function(err, soldiers) {
      if (err) {
        sails.log.error(err)
        return res.send(500)
      } else {
        var dates = soldiers.map(value => {
          var tmp = new Date(value.registered.split(' ').slice(0, -1).join())
          return tmp
        })
        return res.send({
          date: dates
        })
      }
    })
  },

  getSoldiersOnDate: function(req, res) {
    const startDate = req.param('sDate')
    const endDate = req.param('eDate')
    Soldiers.find().exec(function(err, soldiers) {
      if (err) {
        sails.log.error(err)
        return res.send(500)
      } else {
        sendDates = []
        const soldiersByDate = soldiers.map(value => {
          const temp = new Date(value.registered.split(' ').slice(0, -1).join())
          const dTime = temp.getTime() / 1000
          const ndx = dTime.findIndex()
        })
        ndx = dates.index
        return res.sendStatus(200)
      }
    })
  },

  updateDateTimeField: function(req, res) {
    //await Soldiers.update().set({})
    // Soldiers.find().exec(function(err, soldiers) {
    //   if (err) {
    //     sails.log.error(err)
    //     return res.send(500)
    //   } else {
    //     var dates = soldiers.forEach(function(value, index) {
    //       var tmp = new Date(value.registered.split(' ').slice(0, -1).join())
    //       Soldiers.update({
    //         id: index + 1
    //       }).set({
    //         registered: tmp.getTime() / 1000
    //       }).exec(function(err, users) {
    //         if (err) {
    //           sails.log.error(err)
    //           return res.send(500)
    //         } else {
    //           return res.ok()
    //         }
    //       })
    //     })
    //   }
    // })
  }
}
