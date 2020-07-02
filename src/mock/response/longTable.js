import Mock from 'mockjs'
export const getLongTableData = (options) => {
  let arr = []
  for (let i = 0; i < 3000; i++) {
    let tt = {
      'name|2-5': '名称',
      'code': /[1-9][1-9]%/,
      'up': /0\.\d{3}%/,
      'currentPrice': /[0-9]\.\d{2}/,
      'down': /0\.\d{3}/,
      'dealAmount': /\d{5}/,
      'dealMoney|0-1000.2-3': 0,
      'speed': /0\.[0-9][0-9][1-9]%/,
      'hand': /0\.[0-9][1-9]%/,
      'amountRate': /[1-9][1-9]%/,
      'todayOpen|0-100.2-3': 0,
      'max|20-100.2-3': 0,
      'min|0-10.2-3': 0,
      'yestodayProfit|0-100.2-3': 0,
      'rate': /[1-9][1-9]%/
    }
    arr.push(tt)
  }

  return Mock.mock(arr)
}
