export function getHealthyCode(num) {
  if (num == 0) {
    return '绿码'
  } else if (num == 1) {
    return '黄码'
  } else if (num == 2) {
    return '红码'
  }
}
