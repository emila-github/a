// https://github.com/youzan/vant/issues/5728#issuecomment-591856065
module.exports = ({ file }) => {
  let remUnit
  if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
    remUnit = 37.5
  } else {
    remUnit = 75
  }
  return {
    plugins: {
      'postcss-pxtorem': {
        rootValue: remUnit,
        propList: ['*'],
      },
      autoprefixer: {},
    },
  }
}
