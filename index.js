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
          if (typeData.length === 0) {
              request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Category='GUNS'`, headers: headers}, function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                      
                      let newItems = JSON.parse(body)
                      res.json(newItems)
                      console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'guns',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
})
  

app.get('/ammo', (req, res) => {
  db
    .select('*')
    .from('types')
    .where({type: 'ammo'})
    .then(typeData => {
        if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Category='AMMO'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                    db('types')
                        .insert([{
                            type: 'ammo',
                            data: JSON.stringify(newItems)
                        }])
                        .catch(error => {
                            return res.json(error)
                        })
                }
            });
              
        } else {
            res.json(typeData[0].data)
            console.log('Get From Database Was Successful')
        }
    })
})

  app.get('/scope', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'scope'})
      .then(typeData => {
          if (typeData.length === 0) {
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
                    db('types')
                                .insert([{
                                    type: 'scope',
                                    data: JSON.stringify(newItems)
                                }])
                                .catch(error => {
                                    return res.json(error)
                  })
                }
            });
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/sling', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'sling'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Nylon Sling'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'sling',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/bipod', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'bipod'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Bipods'`, headers: headers}, function (error, response, body) {
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
                    db('types')
                                .insert([{
                                    type: 'bipod',
                                    data: JSON.stringify(newItems.data)
                                }])
                                .catch(error => {
                                    return res.json(error)
                  })
                }
            });
          } else {
              res.json(typeData.data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/miscfirearm', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'miscfirearm'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Category='SHOOTING/GUN ACCESSORIES'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'miscfirearm',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/bow', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'bow'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Bow Package'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'bow',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/arrow', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'arrow'})
      .then(typeData => {
          if (typeData.length === 0) {
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
                    db('types')
                                .insert([{
                                    type: 'arrow',
                                    data: JSON.stringify(newItems)
                                }])
                                .catch(error => {
                                    return res.json(error)
                  })
                }
            });
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/broadhead', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'broadhead'})
      .then(typeData => {
          if (typeData.length === 0) {
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
                    db('types')
                                .insert([{
                                    type: 'broadhead',
                                    data: JSON.stringify(newItems)
                                }])
                                .catch(error => {
                                    return res.json(error)
                  })
                }
            });
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/miscarchery', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'miscarchery'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Category='ARCHERY'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'miscarchery',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/headwear', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'headwear'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Caps'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'headwear',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/covermask', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'covermask'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Masks'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'covermask',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/jacket', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'jacket'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Jackets'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'jacket',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })
  
  app.get('/Shirt', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'Shirt'})
      .then(typeData => {
          if (typeData.length === 0) {
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
                    db('types')
                                .insert([{
                                    type: 'Shirt',
                                    data: JSON.stringify(newItems)
                                }])
                                .catch(error => {
                                    return res.json(error)
                  })
                }
            });
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })
  
  app.get('/pants', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'pants'})
      .then(typeData => {
          if (typeData.length === 0) {
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
                    db('types')
                                .insert([{
                                    type: 'pants',
                                    data: JSON.stringify(newItems)
                                }])
                                .catch(error => {
                                    return res.json(error)
                  })
                }
            });
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })
  
  app.get('/gaiter', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'gaiter'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Leg Gaiter'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'gaiter',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/sock', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'sock'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Name~'Wool Socks'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'sock',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })
  
  app.get('/backpack', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'backpack'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Manufacturer='Mystery Ranch'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                   
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'backpack',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/binocularholder', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'binocularholder'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Name~'Binocular Holder'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'binocularholder',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/bladder', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'bladder'})
      .then(typeData => {
          if (typeData.length === 0) {
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
                      db('types')
                          .insert([{
                              type: 'bladder',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/binos', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'binos'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Name~'Binoculars'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'binos',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/spotting', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'spotting'})
      .then(typeData => {
          if (typeData.length === 0) {
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
                      db('types')
                          .insert([{
                              type: 'spotting',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/rangefinder', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'rangefinder'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Name~'Rangefinder'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                   
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'rangefinder',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/processing', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'processing'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Field Dressing Tools'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                   
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'processing',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/knive', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'knive'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Category='CUTLERY'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'knive',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/replacementblades', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'replacementblades'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Name~'Replacement Blade'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'replacementblades',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/saw', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'saw'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Name~'Hand Saw'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'saw',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/sheer', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'sheer'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Name~'Shear'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'sheer',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/gamebag', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'gamebag'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Game Bags'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                   
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'gamebag',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/gloves', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'gloves'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Gloves'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                  
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'gloves',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/rope', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'rope'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Gambrels & Hoists'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                  
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'rope',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })
  
  app.get('/medical', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'medical'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Survival/First Aid'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                   
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'medical',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/waterpurifier', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'waterpurifier'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Water Treatment'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                   
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'waterpurifier',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/gps', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'gps'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Handheld GPS'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                   
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'gps',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/misc', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'misc'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRaQqFLucKLG163953CbkV6UeFC5k65535/Catalogs/4595`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                   
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'misc',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/hikinghat', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'hikinghat'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Hats'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'hikinghat',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/windbreaker', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'windbreaker'})
      .then(typeData => {
          if (typeData.length === 0) {
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
                      db('types')
                          .insert([{
                              type: 'windbreaker',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/hikingshirt', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'hikingshirt'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Shirts'&pageSize=500`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'hikingshirt',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/hikingpants', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'hikingpants'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Pants'&pageSize=500`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'hikingpants',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/hikingsock', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'hikingsock'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Name~'Hiking Socks'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'hikingsock',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/hikingboot', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'hikingboot'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Hiking'&pageSize=500`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'hikingboot',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/hikingbackpack', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'hikingbackpack'})
      .then(typeData => {
          if (typeData.length === 0) {
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
                      db('types')
                          .insert([{
                              type: 'hikingbackpack',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/headlamp', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'headlamp'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Flashlights & Headlamps'&pageSize=500`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'headlamp',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/compass', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'compass'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Name~'Compass'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'compass',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/trekkingpoles', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'trekkingpoles'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Name~'Trekking Poles'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'trekkingpoles',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/essentialsmisc', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'essentialsmisc'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Camp Accessories'&pageSize=500`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'essentialsmisc',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/firestarter', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'firestarter'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Name~'Fire Starter'`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'firestarter',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })
  
  app.get('/rod', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'rod'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Spinning'&pageSize=500`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'rod',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/fishingline', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'fishingline'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Catergory='Fishing > Fishing Line'&pageSize=500`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'fishingline',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/hook', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'hook'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Circle & Octopus Hooks'&pageSize=500`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'hook',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/bait', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'bait'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Category='Fishing > Fish Attractant & Bait'&pageSize=500`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'bait',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/lure', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'lure'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Category='LURES'&pageSize=500`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'lure',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/pliers', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'pliers'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Pliers'&pageSize=500`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'pliers',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/linecutter', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'linecutter'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Clippers & Cutters'&pageSize=500`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'linecutter',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/bottle', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'bottle'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Water Bottles'&pageSize=500`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'bottle',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/tacklebox', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'tacklebox'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Name='Tackle Box'&pageSize=500`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'tacklebox',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/wadder', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'wadder'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Fishing'&pageSize=500`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'wadder',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
  })

  app.get('/shoe', (req, res) => {
    db
      .select('*')
      .from('types')
      .where({type: 'shoe'})
      .then(typeData => {
          if (typeData.length === 0) {
            request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Labels='Fishing/Water'&pageSize=500`, headers: headers}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let newItems = JSON.parse(body)
                    res.json(newItems)
                    console.log('Get Was Successful')
                      db('types')
                          .insert([{
                              type: 'shoe',
                              data: JSON.stringify(newItems)
                          }])
                          .catch(error => {
                              return res.json(error)
                          })
                  }
              });
                
          } else {
              res.json(typeData[0].data)
              console.log(typeData[0].data)
              console.log('Get From Database Was Successful')
          }
      })
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
