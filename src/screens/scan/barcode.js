import { LotteryType } from '@common';
import { convolutions, getSplitCharater } from '@utils';
import { Buffer } from 'buffer';

export const mapDataFromScannerKeno = {
	'11': '81', // Lớn
	'12': '82', // Nhỏ
	'13': '84', // Chẵn 13+
	'14': '86', // Lẻ 13+
	'15': '83', // Hoà lớn nhỏ =================chưa kiểm định
	'16': '85', // Hoà (chẵn lẻ)
	'17': '87', // Chẵn (11-12)
	'18': '88' // Lẻ (11-12)  ==================chưa kiểm định
}


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
	else return {
		message: "Không có dữ liệu"
	}

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
			LOTTERY_TYPE = LotteryType.Mega
			break;
		case '2000':
			LOTTERY_BYTE = POWER_BYTE
			LOTTERY_TYPE = LotteryType.Power
			break;
		case '0400':
			LOTTERY_BYTE = KENO_BYTE
			LOTTERY_TYPE = LotteryType.Keno
			break;
		case '0002':
			LOTTERY_BYTE = MAX3D_BYTE
			LOTTERY_TYPE = LotteryType.Max3D
			break;
		case '0008':
			LOTTERY_BYTE = MAX3D_BYTE
			LOTTERY_TYPE = LotteryType.Max3DPro
			break;
		default:
			LOTTERY_BYTE = MAX3D_BYTE
			LOTTERY_TYPE = LotteryType.Max3DPlus
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

		res[index] = {
			boSo: [],
			bac: 0,
			tienCuoc: 0
		}

		let max3d_bac = hex.slice(0, 2) // byte danh dau bat dau bo so
		hex = hex.slice(2)
		if (LOTTERY_TYPE == LotteryType.Max3DPro) {
			res[index].bac = parseInt('0x' + max3d_bac)
			console.log(res[index].bac)
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
			so1 = so1.toString().padStart(3, "0")
			so2 = so2.toString().padStart(3, "0")
			res[index].boSo.push(so1)
			if (count == 2) {
				res[index].boSo.push(so2)
				if (LOTTERY_TYPE == LotteryType.Max3D) {
					LOTTERY_TYPE = LotteryType.Max3DPlus
				}
			}
		}
		// Truong hop bo so KENO, POWER, MEGA
		else {
			for (let i = 0; i < data_so.length; i++) {
				if (i % 2 == 0) {
					let so_hex = data_so[i] + data_so[i + 1] // lay so hex 
					so_hex = '0x' + so_hex
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

			let multi = 1
			if (LOTTERY_TYPE == LotteryType.Max3DPro && res[index].bac == 2) {
				multi = cntDistinct(res[index].boSo[0]) * cntDistinct(res[index].boSo[1])
			}
			let tien1 = hex.slice(0, 2)
			hex = hex.slice(2)
			res[index].tienCuoc = parseInt(tien1, 16) * 10000 * multi
			if (LOTTERY_BYTE == KENO_BYTE) {
				let bac1 = hex.slice(0, 2)
				hex = hex.slice(2)
				res[index].bac = parseInt(bac1, 16)
			}
		}

		if (LOTTERY_BYTE == POWER_BYTE) {
			res[index].bac = res[index].boSo.length
			res[index].tienCuoc = convolutions(6, res[index].boSo.length, LOTTERY_TYPE) * 10000
		}

		// Convert special value Keno
		if (LOTTERY_BYTE == KENO_BYTE) {
			if (res[index].bac > 10) {
				for (let i = 0; i < res[index].boSo.length; i++) {
					const element = res[index].boSo[i]
					res[index].boSo[i] = mapDataFromScannerKeno['' + element]
				}
			}
		}

		index++
	}

	let total = 0;
	for (const element of res) {
		total = total + element.tienCuoc
	}

	return {
		ID_MBH: machine_code.slice(2) + machine_code.slice(0, 2),
		ID_VE: lottery_id,
		LOAI_VE: LOTTERY_TYPE,
		type: LOTTERY_TYPE,
		NGAY_MUA: printDate(buy_date_hex),
		KY_QUAY: draw_code_number,
		NGAY_QSMT: printDate(draw_date_hex),
		DAY_SO_MUA: res,
		TOTAL: total,
		message: "success",
		NumberLottery: {
			numberDetail: getNumberDetail(res, LOTTERY_TYPE),
			level: (LOTTERY_TYPE !== LotteryType.Max3DPro ?
				res[0].boSo.length :
				(res[0].bac == 2 ? 4 : 1))
		}
	}

	// return obj
	// return JSON.stringify(obj)
	// let str = ''
	// for (const key in obj) {
	// 	str = str + key + ": " + JSON.stringify(obj[key]) + "\n"
	// }
	// return str
}

function getNumberDetail(numbers, LOAI_VE) {
	const splitCharater = getSplitCharater(LOAI_VE)
	let tmp = []
	for (const element of numbers) {
		tmp.push({
			boSo: element.boSo.join(splitCharater),
			tienCuoc: element.tienCuoc,
			bac: element.bac
		})
	}
	return tmp
}

export function scanBarCode(param) {
	let tmp
	try {
		tmp = scan(param)
	} catch (error) {
		return {
			message: 'Mã vạch không hợp lệ'
		}
	}
	return tmp
}

export function cntDistinct(str) {
	let s = new Set();
	for (let i = 0; i < str.length; i++) {
		s.add(str[i]);
	}

	if (s.size == 3) return 6
	if (s.size == 2) return 3
	if (s.size == 1) return 1
	return s.size;
}