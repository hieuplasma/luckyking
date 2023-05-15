import { Buffer } from 'buffer';

function hex2bin(hex) {
	return (parseInt(hex, 16)).toString(2).padStart(16, "0");
}

function printDate(hex_string) {
	let bin_string = hex2bin('0x' + hex_string.match(/../g).reverse().join(''));
	const year = '20' + parseInt(bin_string.slice(0, 7), 2);
	const month = parseInt(bin_string.slice(7, 11), 2);
	const date = parseInt(bin_string.slice(11, 16), 2);
	return date + "/" + month + "/" + year
}

function reverseString(str) {
	return str.split("").reverse().join("");
}

const KENO_BYTE = 22
const POWER_BYTE = 16
const MEGA_BYTE = 16
const MAX3D_BYTE = 12
let LOTTERY_BYTE
let LOTTERY_TYPE = ''

function scan(param) {
	let data = '';

	if (param) data = param
	else return "Không có dữ liệu"

	let buff = Buffer.from(data, 'base64');
	let hex = buff.toString('hex')
	hex = hex.slice(2) // bo byte dau
	let lottery_id = hex.slice(0, 16)
	hex = hex.slice(16)
	hex = hex.slice(2) // bo ky tu ko can thiet
	let buy_date_hex = hex.slice(0, 4)
	hex = hex.slice(4)
	hex = hex.slice(4)
	let machine_code = hex.slice(0, 4)
	hex = hex.slice(4)
	let lottery_code = hex.slice(0, 4)
	hex = hex.slice(4)
	switch (lottery_code.toString()) {
		case '0800':
			LOTTERY_BYTE = MEGA_BYTE
			LOTTERY_TYPE = 'MEGA'
			break;
		case '2000':
			LOTTERY_BYTE = POWER_BYTE
			LOTTERY_TYPE = 'POWER'
			break;
		case '0400':
			LOTTERY_BYTE = KENO_BYTE
			LOTTERY_TYPE = 'KENO'
			break;
		case '0002':
			LOTTERY_BYTE = MAX3D_BYTE
			LOTTERY_TYPE = 'MAX3D'
			break;
		case '0008':
			LOTTERY_BYTE = MAX3D_BYTE
			LOTTERY_TYPE = 'MAX3D PRO'
			break;
		default:
			LOTTERY_BYTE = MAX3D_BYTE
			LOTTERY_TYPE = 'MAX3D PLUS'
			break
	}
	let draw_code_string = hex.slice(0, 8)
	hex = hex.slice(8)
	let draw_code_number = parseInt('0x' + draw_code_string.match(/../g).reverse().join(''));
	let draw_date_hex = hex.slice(0, 4)
	hex = hex.slice(4)
	hex = hex.slice(8) // bo ky tu ko can thiet den 0d và \x00 đầu
	let res = []
	let index = 0
	while (hex.length > 1) {
		hex = hex.slice(2) // byte danh dau bat dau bo so
		res[index] = {
			boSo: [],
			bac: 0,
			tien: 0
		}
		// Lay 11 byte
		let data_so = hex.slice(0, LOTTERY_BYTE)
		hex = hex.slice(LOTTERY_BYTE)
		let so_array = ''
		// TRUONG HOP BO SO MAX 3D, MAX 3D+, MAX 3D PRO
		if (LOTTERY_BYTE == MAX3D_BYTE) {
			let count = parseInt('0x' + data_so.slice(0, 4).match(/../g).reverse().join(''))
			let so1 = parseInt('0x' + data_so.slice(4, 8).match(/../g).reverse().join(''))
			let so2 = parseInt('0x' + data_so.slice(8, 12).match(/../g).reverse().join(''))
			res[index].boSo.push(so1)
			if (count == 2) res[index].boSo.push(so2)
		}
		// Truong hop bo so KENO, POWER, MEGA
		else {
			for (let i = 0; i < data_so.length; i++) {
				if (i % 2 == 0) {
					let so_hex = data_so[i] + data_so[i + 1] // lay so hex 
					so_hex = '0x' + so_hex
					// let so_dec = parseInt(so_hex) //Convert sang Decimal
					// let so_bin = converter(so_dec).toBinary() // Convert sang binary
					let so_bin = parseInt(so_hex, 16).toString(2);
					let len = so_bin.length
					for (let j = 0; j < 8 - len; j++) {
						so_bin = '0' + so_bin
					}
					so_bin = reverseString(so_bin)
					so_array += so_bin
				}
			}
			for (let i = 0; i < so_array.length; i++) {
				if (so_array[i] == 1) {
					res[index].boSo.push(i)
				}
			}
		}
		if (LOTTERY_BYTE == KENO_BYTE || LOTTERY_BYTE == MAX3D_BYTE) {
			let tien1 = hex.slice(0, 2)
			hex = hex.slice(2)
			res[index].tien = parseInt(tien1, 16) * 10000
			if (LOTTERY_BYTE == KENO_BYTE) {
				let bac1 = hex.slice(0, 2)
				hex = hex.slice(2)
				res[index].bac = parseInt(bac1, 16)
			}
		}

		if (LOTTERY_BYTE == POWER_BYTE) {
			delete res[index].bac
			delete res[index].tien
		}

		index++
	}

	const obj = {
		ID_MBH: machine_code.slice(2) + machine_code.slice(0, 2),
		ID_VE: lottery_id,
		LOAI_VE: LOTTERY_TYPE,
		NGAY_MUA: printDate(buy_date_hex),
		KY_QUAY: draw_code_number,
		NGAY_QSMT: printDate(draw_date_hex),
		DAY_SO_MUA: res
	}
	// return JSON.stringify(obj)
	let str = ''
	for (const key in obj) {
		str = str + key + ": " + JSON.stringify(obj[key]) + "\n"
	}
	return str
}

export function scanBarCode(param) {
	let tmp
	try {
		tmp = scan(param)
	} catch (error) {
		return 'Mã vạch không hợp lệ'
	}
	return tmp
}