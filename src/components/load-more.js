// 设置默认溢出显示数量
const spillDataNum = 20

// 设置隐藏函数
let timeout = false
const setRowDisableNone = function (topNum, showRowNum, binding) {
  if (timeout) {
    clearTimeout(timeout)
  }
  timeout = setTimeout(() => {
    binding.value.call(null, topNum, topNum + showRowNum + spillDataNum - 1)
  })
}
export default {
  name: 'loadmore',
  componentUpdated (el, binding, vnode, oldVnode) {
    setTimeout(() => {
      const dataSize = vnode.data.attrs['data-size']
      const oldDataSize = oldVnode.data.attrs['data-size']
      if (dataSize === oldDataSize) {
        return
      }
      const selectWrap = el.querySelector('.el-table__body-wrapper')
      const selectTbody = selectWrap.querySelector('table tbody')
      const selectRow = selectWrap.querySelector('table tr')
      if (!selectRow) {
        return
      }
      selectWrap.scrollTop = 0
      const rowHeight = selectRow.clientHeight
      let tableHeight = selectWrap.clientHeight
      let showRowNum = Math.round(tableHeight / rowHeight)
      const nodesTr = selectTbody.querySelector('.addTr')
      const createElementTR = document.createElement('tr')
      createElementTR.classList.add('addTr')
      let createElementTRHeight = (dataSize - spillDataNum) * rowHeight - tableHeight
      createElementTR.setAttribute('style', `height: ${createElementTRHeight}px;`)
      selectTbody.append(createElementTR)
      nodesTr && nodesTr.remove()
      // 监听滚动后事件
      selectWrap.addEventListener('scroll', function () {
        if (tableHeight !== selectWrap.clientHeight) { // 如果列表高度发生变化，重新计算一次
          tableHeight = selectWrap.clientHeight
          createElementTRHeight = (dataSize - spillDataNum) * rowHeight - tableHeight
          showRowNum = Math.round(tableHeight / rowHeight)
        }
        let topPx = this.scrollTop - spillDataNum * rowHeight + (tableHeight - showRowNum * rowHeight)
        let topNum = Math.round(topPx / rowHeight)
        const minTopNum = dataSize - spillDataNum - showRowNum
        if (topNum > minTopNum) {
          topNum = minTopNum
        }
        if (topNum < 0) {
          topNum = 0
          topPx = 0
        }
        selectTbody.setAttribute('style', `transform: translateY(${topPx}px)`)
        createElementTR.setAttribute('style', `height: ${createElementTRHeight - topPx > 0 ? createElementTRHeight - topPx : 0}px;`)
        setRowDisableNone(topNum, showRowNum, binding)
      })
    })
  }
}
