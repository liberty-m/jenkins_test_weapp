import axios from 'axios'
import qs from 'qs'

const baiduCloud = {
  APIKEY: 'cG12a3D2vY96dk3FWLQkSnlt',
  SECKEY: 'ZEnAMhn15dtXQxz3kpY3VGNFFsz4eKXN'
}

function getBaiduToken() {
  return new Promise((resolve) => {
    axios
      .post(
        `/baidu/oauth/2.0/token?grant_type=client_credentials&client_id=${baiduCloud.APIKEY}&client_secret=${baiduCloud.SECKEY}`,
        {},
        {
          headers: {
            'content-type': 'application/json; charset-UTF-8'
          }
        }
      )
      .then((res) => {
        return resolve(res)
      })
      .catch(() => {
        console.log('baidu scan is fail...')
      })
  })
}

export default (imageData) => {
	this.$util.showToast('图片扫描中...')
  return getBaiduToken().then((res) => {
    //获取token
    return new Promise((resolve) => {
      const token = res.data.access_token
      const detectUrl = `/baidu/rest/2.0/ocr/v1/idcard?access_token=${token}` // baiduToken是已经获取的access_Token
      const scanData = { id_card_side: 'front', image: imageData }
      axios({
        method: 'post',
        url: detectUrl,
        data: qs.stringify(scanData),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then((res) => {
          return resolve(res)
        })
        .catch(() => {
          console.log('get id info word fail...')
        })
    })
  })
}
