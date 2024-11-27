var mysql = require('mysql');
const fs = require('fs');
const {con} = require('./createConnection');


const readFileContent = async (filePath) => {
    const data = await fs.promises.readFile(`entities/${filePath}`, { encoding: 'utf8' })
    return data;
}
const readFolderContent = async () => {
    const files = await fs.promises.readdir('entities');
    return files;
}
con.connect(async function (err) {
    if (err) throw err;
    console.log("Connected!");
    const files = await readFolderContent();
    console.log(files)
    files.map(async file => {
        let data = await (readFileContent(file));
        const content = JSON.parse(data)
        console.log(content)
        const keys = Object.keys(content);
        console.log('keys: ', keys);
        const values = Object.values(content);
        console.log('values: ', values);
        let sqlProp = "";
        keys.forEach((key, index) => {
            if (index === keys.length - 1) {
                sqlProp += `${key} ${values[index]}`;
            }
            else {
                sqlProp += `${key} ${values[index]}, `;
            }
        })
        console.log(sqlProp)
        const tableName = file.split('.')[0];
        var sql = `CREATE TABLE ${tableName} (${sqlProp})`;
        console.log('sql: ', sql);
        
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });
    })

});
