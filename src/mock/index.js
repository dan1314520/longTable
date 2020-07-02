import Mock from 'mockjs'
import {getLongTableData} from './response/longTable'
Mock.setup({
  timeout: '500-2000'
})
Mock.mock(/\/getLongTableData/, getLongTableData)
