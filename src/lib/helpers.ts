export const rgb = (RGB: number[]) => `rgb(${RGB[0]},${RGB[1]},${RGB[2]})`
export const hsla = (HSLA: number[]) =>
	`hsla(${HSLA[0]},${100.0 * HSLA[1]}%,${100.0 * HSLA[2]}%,${HSLA[3]})`

const hs = {
	red: 0,
	yellow: 60,
	green: 120,
	teal: 180,
	blue: 240,
	pink: 330
}

const s = 0.9
const l = 0.5

export const cols = {
	white: [0, 0, 0.9, 1],
	greyLt: [0, 0, 0.35, 1],
	greyMd: [0, 0, 0.25, 1],
	greyDk: [0, 0, 0.15, 1],
	red: [hs.red, s, l, 1],
	yellow: [hs.yellow, s, l, 1],
	green: [hs.green, s, l, 1],
	teal: [hs.teal, s, l, 1],
	blue: [hs.blue, s, l, 1],
	pink: [hs.pink, s, l, 1]
}

export const replaceZerosWithPreviousValue = (nums: number[]) => {
	let result = Array(nums.length)
	for (let i = 0; i < nums.length; i++) {
		if (nums[i] === 0.0) {
			result[i] = result[i - 1]
		} else {
			result[i] = nums[i]
		}
	}
  return result
}

export const calcRollAvgs = (win: number, nums: number[]) => {
	let avgs = []
	for (let i = 0; i < nums.length; i++) {
		let avg = null
		if (i >= win) avg = (1 / win) * nums.slice(i - win, i).reduce((tot, num) => tot + num, 0)
		avgs.push(avg)
	}
	return avgs
}
