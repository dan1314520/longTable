/***
 * @Author:xxx
 * @Date:2020-02-17 16:15:21
 * @LastModifiedBy:xxx
 * @Last Modified time:2020-02-17 16:35:21
 */

import { post } from '../axios'

export const getLongTableData = (p) => post(`/getLongTableData`, p)
