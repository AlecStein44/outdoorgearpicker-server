const express = require('express')
const knex = require('knex')
const app = express()
const cors = require('cors')
const request = require('request')
const user = 'IRSYkqTyNep22276244pB9TuBUoBytYTN1'
const password = '2GBhaG~vQWZBKpjTohvSJdracm~Sf9vh'
const url = 'http://' + user + ':' + password + '@api.impact.com'
const {DB_URL} = require('./config')
const headers = {Accept: 'application/json'}

app.use(express.json());
app.use(cors())

const db = knex({
    client: 'pg',
    connection: DB_URL,
})

let numViews = 0

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


app.get('/', (req, res) => {
  
  numViews++;
  
   console.log(numViews)
})
  
  app.get('/guns', (req, res) => {
      db
        .select('*')
        .from('types')
        .where({type: 'guns'})
        .then(typeData => {
            console.log(typeData)
            if (typeData.length === 0) {
                request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Category='GUNS'`, headers: headers}, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        
                        let newItems = JSON.parse(body)
                        res.json(newItems)
                        console.log('Get Was Successful')
                        db('types')
                            .insert([{
                                type: typeData
                            }])
                    }
                });
                  
            } else {
                res.json(typeData)
            }
        })
  })
  
  app.get('/ammo', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Category='AMMO'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/scope', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Category='OPTICS'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let newBody = JSON.parse(body)
              let newItems = []
             for(let i = 0; i < newBody.Items.length; i++) {
                  if(newBody.Items[i].Name.includes('Rifle Scope')) {
                      newItems.push(newBody.Items[i])
                  }
              }
              newBody.Items = newItems
              res.json(newBody)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/sling', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Nylon Sling'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/bipod', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Category='SHOOTING/GUN ACCESSORIES'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let newBody = JSON.parse(body)
              let newItems = []
             for(let i = 0; i < newBody.Items.length; i++) {
                  if(newBody.Items[i].Name.includes('Bipod')) {
                      newItems.push(newBody.Items[i])
                  }
              }
              newBody.Items = newItems
              res.json(newBody)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/miscfirearm', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Category='SHOOTING/GUN ACCESSORIES'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/bow', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Bow Package'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/arrow', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Category='ARCHERY'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let newBody = JSON.parse(body)
              let newItems = []
             for(let i = 0; i < newBody.Items.length; i++) {
                  if(newBody.Items[i].Name.includes('Arrows')) {
                      newItems.push(newBody.Items[i])
                  }
              }
              newBody.Items = newItems
              res.json(newBody)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/broadhead', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Fixed Blade'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let newBody = JSON.parse(body)
              let newItems = []
             for(let i = 0; i < newBody.Items.length; i++) {
                  if(newBody.Items[i].Name.includes('Broadhead')) {
                      newItems.push(newBody.Items[i])
                  }
              }
              newBody.Items = newItems
              res.json(newBody)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/miscarchery', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Category='ARCHERY'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/headwear', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Caps'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/covermask', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Masks'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/jacket', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Jackets'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/shirt', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Category='RH APPAREL'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let newBody = JSON.parse(body)
              let newItems = []
             for(let i = 0; i < newBody.Items.length; i++) {
                  if(newBody.Items[i].Name.includes('Shirt')) {
                      newItems.push(newBody.Items[i])
                  }
              }
              newBody.Items = newItems
              res.json(newBody)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/pants', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Pants'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let newBody = JSON.parse(body)
              let newItems = []
             for(let i = 0; i < newBody.Items.length; i++) {
                  if(newBody.Items[i].Name.includes('Hunting Pants')) {
                      newItems.push(newBody.Items[i])
                  }
              }
              newBody.Items = newItems
              res.json(newBody)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/gaiter', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Leg Gaiter'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/sock', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Name~'Wool Socks'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/backpack', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Manufacturer='Mystery Ranch'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
             
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/binocularholder', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Name~'Binocular Holder'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/bladder', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Category='PACKS AND BAGS'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let newBody = JSON.parse(body)
              let newItems = []
             for(let i = 0; i < newBody.Items.length; i++) {
                  if(newBody.Items[i].Name.includes('Hydration Reservoir')) {
                      newItems.push(newBody.Items[i])
                  }
              }
              newBody.Items = newItems
              res.json(newBody)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/binos', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Name~'Binoculars'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/spotting', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Category='OPTICS'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let newBody = JSON.parse(body)
              let newItems = []
             for(let i = 0; i < newBody.Items.length; i++) {
                  if(newBody.Items[i].Name.includes('Spotting Scope')) {
                      newItems.push(newBody.Items[i])
                  }
              }
              newBody.Items = newItems
              res.json(newBody)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/rangefinder', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Name~'Rangefinder'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
             
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/processing', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Field Dressing Tools'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
             
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/knive', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Category='CUTLERY'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              
              let newItems = JSON.parse(body)
              res.json(newItems)
          }
      });
  })
  
  app.get('/replacementblades', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Name~'Replacement Blade'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/saw', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Name~'Hand Saw'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/sheer', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Name~'Shear'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/gamebag', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Game Bags'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
             
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/gloves', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Gloves'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/rope', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Gambrels & Hoists'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/medical', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Survival/First Aid'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
             
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/waterpurifier', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Water Treatment'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
             
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/gps', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Handheld GPS'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
             
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/misc', (req, res) => {
      request({url: `${url}/Mediapartners/IRaQqFLucKLG163953CbkV6UeFC5k65535/Catalogs/4595`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
             
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/hikinghat', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Hats'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/windbreaker', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Jackets'&pageSize=500`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let newBody = JSON.parse(body)
              let newItems = []
             for(let i = 0; i < newBody.Items.length; i++) {
                  if(newBody.Items[i].Name.includes('Windbreaker')) {
                      newItems.push(newBody.Items[i])
                  }
              }
              newBody.Items = newItems
              res.json(newBody)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/hikingshirt', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Shirts'&pageSize=500`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/hikingpants', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Pants'&pageSize=500`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/hikingsock', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Name~'Hiking Socks'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/hikingboot', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Hiking'&pageSize=500`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/hikingbackpack', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Category='PACKS AND BAGS'&pageSize=500`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let newBody = JSON.parse(body)
              let newItems = []
             for(let i = 0; i < newBody.Items.length; i++) {
                  if(newBody.Items[i].Name.includes('Backpack')) {
                      newItems.push(newBody.Items[i])
                  }
              }
              newBody.Items = newItems
              res.json(newBody)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/headlamp', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Flashlights & Headlamps'&pageSize=500`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/compass', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Name~'Compass'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/trekkingpoles', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Name~'Trekking Poles'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/essentialsmisc', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Camp Accessories'&pageSize=500`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/firestarter', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Name~'Fire Starter'`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/rod', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Spinning'&pageSize=500`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/fishingline', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Catergory='Fishing > Fishing Line'&pageSize=500`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/hook', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Circle & Octopus Hooks'&pageSize=500`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/bait', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Category='Fishing > Fish Attractant & Bait'&pageSize=500`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/lure', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Category='LURES'&pageSize=500`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/pliers', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Pliers'&pageSize=500`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/linecutter', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Clippers & Cutters'&pageSize=500`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/bottle', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Water Bottles'&pageSize=500`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/tacklebox', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Name='Tackle Box'&pageSize=500`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/wadder', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Fishing'&pageSize=500`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/shoe', (req, res) => {
      request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Fishing/Water'&pageSize=500`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let newItems = JSON.parse(body)
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/prevpage', (req, res) => {
      request({url: `${url}${req.query.uri}&Query=${req.query.Query}`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let newItems = JSON.parse(body)
              
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })
  
  app.get('/nextpage', (req, res) => {
      request({url: `${url}${req.query.uri}&AfterId=${req.query.AfterId}&Query=${req.query.Query}`, headers: headers}, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              let newItems = JSON.parse(body)
              
              res.json(newItems)
              console.log('Get Was Successful')
          }
      });
  })

app.get('/test', (req, res) => {
    /*request({url: `${url}/Catalogs/ItemSearch?Query=Category='GUNS'`, headers: headers}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            
            res.json(body)
        }
});*/
    res.json('test')
})

/*const http = require('http');
router.get('/impactApi', (req, res) => {
  http.request(
    IMPACT_API_ENDPOINT,
    {
      method: 'POST'
      body:  generateRequestBody(req),
      headers: generateImpactHeaders(req)
    },
    (apiResponse) => {
      res.statusCode = apiResponse.statusCode;
      let apiBody = '';
      res.on('data', chunk => apiBody += chunk);
      res.on('end', () => {
        res.send(parseApiResponse(apiBody));
      });
    }
  );
});*/
