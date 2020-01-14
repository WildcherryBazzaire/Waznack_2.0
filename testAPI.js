const axios = require('axios');

var insult = ['Fuk off you <adjective> <animal> <animal_part>','<adjective min=1 max=4> nigger']

var link = `https://insult.mattbas.org/api/insult.json?template=${insult[1]} `;

axios.get(link)
  .then(e => {
    console.log(e.data.insult);
  });