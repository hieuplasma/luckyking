const {converter} = require("javascript-binary-converter");

function reverseString(str) {
    return str.split("").reverse().join("");
}


let data  = 'AgIIyB+WkTDAAYsuRRapHQQA8v8BAIsuAQpkDQAAAAAZWgCAABIAAAEK';

if (process.argv.length > 2)
{
    data = process.argv[2]
}

let buff = Buffer.from(data, 'base64');
let text = buff.toString('ascii');

let hex = buff.toString('hex')
console.log(hex, hex.length)

hex = hex.slice(2) // bo byte dau
console.log(hex)

let lottery_id = hex.slice(0,16)
hex = hex.slice(16) // bo 16 ky tu id
console.log(hex)

hex = hex.slice(2) // bo ky tu ko can thiet
console.log(hex)

let data1 = hex.slice(0, 28) // lay data tiep
console.log(data1)
hex = hex.slice(28) // bo phan data1
console.log(hex)

hex = hex.slice(10) // bo ky tu ko can thiet den 0d và \x00 đầu
console.log(hex)

//let data1 = hex.slice(0, 28) // lay data tiep
//console.log(data1)
//hex = hex.slice(28) // bo phan data1
console.log(hex.length)


// Lay 11 byte
let data_so = hex.slice(0, 22)
console.log("DATA_SO:", hex)

let so_array = ''

for (var i = 0; i < data_so.length; i++) {
    if (i % 2 == 0)
    {
	console.log('i', i)
	so_hex = data_so[i] + data_so[i+1] // lay so hex 
	so_hex = '0x' + so_hex

	so_dec = parseInt(so_hex) //Convert sang Decimal
	//console.log('HEX', so_hex, 'DEC', so_dec)
	so_bin = converter(so_dec).toBinary() // Convert sang binary
	//console.log("SOBIN LENGTH", so_bin.length)

	//padding them so 0 o dau cho du 8 bit
	len = so_bin.length 
	for (var j = 0; j < 8 - len; j++)
	{
	    so_bin = '0' + so_bin
	}
	
	//console.log('TYpe', typeof(so_bin), so_bin)
	so_bin = reverseString(so_bin)
	console.log("Reversed:", so_bin)
	so_array += so_bin
    }
}

console.log("SO_ARRAY:", so_array);

res = []
for (var i =0; i < so_array.length; i++){
    if (so_array[i] == 1){
	res.push(i)
    }
}

console.log("\n----------------------THONG TIN VE-----------------")
console.log("ID:",lottery_id)
console.log("DAY SO", res);
