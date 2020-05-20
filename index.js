const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const request = require('request')
const user = 'IRSYkqTyNep22276244pB9TuBUoBytYTN1'
const password = '2GBhaG~vQWZBKpjTohvSJdracm~Sf9vh'
const url = 'http://' + user + ':' + password + '@api.impact.com'
const headers = {Accept: 'application/json'}

app.use(express.json());
app.use(cors())

let numViews = 0

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


app.get('/', (req, res) => {
  
  numViews++;
  
   console.log(numViews)
})


app.get('/guns', (req, res) => {
    request({url: `${url}/Mediapartners/IRSYkqTyNep22276244pB9TuBUoBytYTN1/Catalogs/ItemSearch?Query=Category='GUNS'`, headers: headers}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            
            let newItems = JSON.parse(body)
            res.json(newItems)
            console.log('Get Was Successful')
        }
    });
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
            console.log(body)
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
