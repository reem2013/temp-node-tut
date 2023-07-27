const fs = require('fs');
fs.readFile('./first.txt', 'utf-8', (err, data) => {
    if (err){
        return console.log('Error')
    }
    else {
        const output = data;
        fs.writeFile('./output.txt', `here is the output ${output}`, (err, data)=>{
            if (err){
                return console.log('Error')
            }
        })
    }
})
