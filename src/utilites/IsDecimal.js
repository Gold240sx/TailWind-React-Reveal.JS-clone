export function isDecimal(num) {
	return (num ^ 0) !== num / 1
}
