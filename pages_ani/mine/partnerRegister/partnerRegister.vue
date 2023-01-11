<template>
	<view class="w100p">
		<image src="/static/images/register_head.png" class="head" mode=""></image>
		<view class="step-box">
			<view class="flex-column-c">
				<text class="step-icon">1</text>
				<text class="fz-20 bold c3">提交资料</text>
			</view>
			<view class="arrow"></view>
			<view class="flex-column-c">
				<text class="step-icon">2</text>
				<text class="fz-20 bold c3">平台审核</text>
			</view>
			<view class="arrow"></view>
			<view class="flex-column-c">
				<text class="step-icon">3</text>
				<text class="fz-20 bold c3">入驻成功</text>
			</view>
		</view>
		<view class="line-brach"></view>
		<view v-if="registerStatus">
			<view class="box">
				<view class="input-title mb-20">
					<image class="input-title-img" src="/static/images/icon/title-icon.png" mode=""></image>
					<text class="input-title-text">审核状态</text>
				</view>
				<view class="red fz-28 ml-40">
					审核未通过，请修改后重新提交
				</view>
				<view class="c3 fz-28 ml-40 mt-20 mb-40">
					驳回原因：身份证号码错误
				</view>
			</view>
		</view>
		<view class="line-brach"></view>
		<view class="box">
			<view class="input-title mb-32">
				<image class="input-title-img" src="/static/images/grade_icon.png" mode=""></image>
				<text class="input-title-text">账号&密码</text>
			</view>
			<view class="input-box" :class="{'verify-box-err':verify.phone}" >
				<text class="input-name">手机号</text>
				<input class="input-content" disabled placeholder="请输入手机号" type="text" @input="verifyPhoneFun" @blur="verifyPhoneFun" v-model="form.phone" />
				<text class="error-text">请输入正确的手机号</text>
			</view>
			<!-- <view class="input-box" :class="{'verify-box-err':verify.password}" >
				<text class="input-name">密码</text>
				<input class="input-content" placeholder="请输入密码" type="password" @blur="verifyPassFun" v-model="form.password" />
				<text class="error-text">长度6-18位，包含数字及英文</text>
			</view>
			<view class="input-box" :class="{'verify-box-err':verify.passwordAgain}" >
				<text class="input-name">确认密码</text>
				<input class="input-content" placeholder="请输入确认密码" type="password"  v-model="form.passwordAgain" />
				<text class="error-text">请输入确认密码</text>
			</view> -->
		</view>
		<view class="line-brach"></view>
		<view class="box">
			<view class="input-title mb-32">
				<image class="input-title-img" src="/static/images/grade_icon.png" mode=""></image>
				<text class="input-title-text">实名认证</text>
			</view>
			<view class="input-box" @tap="visible.idExpand = true" :class="{'verify-box-err':verify.idcardText}">
				<text class="input-name">证件照片</text>
				<text class="input-content">{{form.idcardText || '请上传证件照片'}}</text>
				<text class="error-text">请上传证件照片正反面</text>
			</view>
			<view class="input-box" :class="{'verify-box-err':verify.realName}" >
				<text class="input-name">真实姓名</text>
				<input class="input-content" placeholder="请输入真实姓名" type="text" @input="verifyRealNameFun" @blur="verifyRealNameFun" v-model="form.realName" />
				<text class="error-text">请输入真实姓名</text>
			</view>
			<view class="input-box" :class="{'verify-box-err':verify.idCard}" >
				<text class="input-name">证件号码</text>
				<input class="input-content" placeholder="请输入证件号码" type="text" @input="verifyIdCardFun" @blur="verifyIdCardFun" v-model="form.idCard" />
				<text class="error-text">请输入正确的身份证号</text>
			</view>
			<view class="input-box" @tap="visible.city = true" :class="{'verify-box-err':verify.city}" >
				<text class="input-name">省份城市</text>
				<text class="input-content">{{cityName || '选择省份城市'}}</text>
				<text class="error-text">请选择省份城市</text>
			</view>
			<view class="input-box" :class="{'verify-box-err':verify.mail}" >
				<text class="input-name">邮箱</text>
				<input class="input-content" placeholder="请输入邮箱" type="text" @input="verifyMailFun" @blur="verifyMailFun" v-model="form.mail" />
				<text class="error-text">请输入正确邮箱</text>
				<image class="upload-tip" src="/static/images/icon/puloaded_icon.png" mode=""></image>
			</view>
		</view>
		<view class="mt-100 mb-10">
			<button type="default" class="sub-btn" @tap="submit">提交审核</button>
		</view>
		<view class="line-brach"></view>
		<u-picker
			:show="visible.city"
			@close="visible.city = false"
			@cancel="visible.city = false"
			closeOnClickOverlay
			ref="cityPicker"
			keyName="lable"
			confirmColor="#BC292D"
			:columns="provinceColumns"
			@confirm="(e) => confirm(e, 'city')"
			@change="changeHandler">
		</u-picker>
		<view class="id-mask" :class="{'id-expand':(visible.idExpand === true)}"> 
			<view class="idcard">
				<view class="fz-36 fw-500 text-center mb-20">请上传您的二代身份证</view>
				<view class="fz-26 color-999 text-center mb-30">确保证件清晰完整、属于本人</view>
				<view class="card-wrap" @tap="uploadImg('pre')">
					<image class="w-610 h-395" :src="idCardPositive||'https://tcsrcz.oss-cn-hangzhou.aliyuncs.com/lxw/base/idcard_front.png'" mode=""></image>
					<image v-if="idCardPositive===''" class="w-124 h-124 add" src="/static/images/mine/idcard_add.png" mode=""></image>
					<text v-if="idCardPositive===''">上传人像面</text>
				</view>
				<view class="card-wrap" @tap="uploadImg('back')">
					<image class="w-610 h-395" :src="idCardBack||'https://tcsrcz.oss-cn-hangzhou.aliyuncs.com/lxw/base/idcard_back.png'" mode=""></image>
					<image v-if="idCardBack===''" class="w-124 h-124 add" src="/static/images/mine/idcard_add.png" mode=""></image>
					<text v-if="idCardBack===''">上传国徽面</text>
				</view>
				<view class="lx-btn block wb-88 m-auto mt-80 lt-s-4 fz-32" @tap="idCardsummit()">确认提交</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import formRegular from '@/utils/formRegular.js'
	import cityData from '@/utils/picker.city.js';
	import { debounce } from '@/utils/util.js'
	import rootUrl from '@/utils/request/baseUrl.js'
	import idcardScan from '@/utils/idcardScan';
	import store from '@/store'
	export default {
		data() {
			return {
				data: {
					
				},
				cityName:'',
				registerStatus:false,
				form:{
					parentId:'',
					password:'',
					passwordAgain:'',
					idCardBack:'', //证件反面,
					idCardPositive:'', //证件正面,
					realName:'',
					mail:'',
					province:'',
					city:'',
					idCard:'',
					smsKey:'',
					smsCode:'',
					phone:'',
					idcardText:'',
				},
				verify:{
					idcardText:false,
					mail:false,
					phone:false,
					password:false,
					passwordAgain:false,
					realName:false,
					idCard:false,
					city:false
				},
				visible: {
					showPopup: false,
					school: false,
					level: false,
					category: false,
					city: false,
					status: false,
					idExpand:false
				},
				provinceColumns: [],
				cityColumns: [],
				rootUrl,
				idCardPositive:'',
				idCardBack:'',
			};
		},
		computed: {
			...mapGetters({
				userInfo: 'userInfo'
			})
		},
		onLoad(option) {
			this.form.parentId = option.parentId;
			this.form.phone = this.userInfo.phone
			this.getProvinceList()
		},
		methods: {
			idCardsummit(){
				if (!this.form.idCardPositive) {
					return this.$util.showToast('请上传身份证人像面')
				}
				if (!this.form.idCardBack) {
					return this.$util.showToast('请上传身份证国徽面')
				}
				this.visible.idExpand = false
				let idArr = []
				if(this.form.idCardPositive && this.form.idCardPositive!=='') {
					idArr.push('正面')
				}
				if(this.form.idCardBack && this.form.idCardBack!=='') {
					idArr.push('反面')
				}
				this.form.idcardText = idArr.join(',')
				this.verifyIdCardPositiveFun()
			},
			uploadImg(imgType){
				const that = this
				uni.chooseImage({
					count:1,
					success:(res)=> {
						const car_lic = res.tempFilePaths[0]
						uni.uploadFile({
							url: this.rootUrl+'oss/upload',
							filePath: car_lic,
							name: 'file',
							formData: {
								pathType:3,
							},
							// header: {
							// 	Authorization:store.state.mine.token
							// },
							success: (uploadFileRes) => {
								if(uploadFileRes.statusCode === 200){
									const resDetail = JSON.parse(uploadFileRes.data)
									if(resDetail.code === 200){
										if(imgType === 'pre') {
											this.form.idCardPositive = resDetail.data.savePath
											this.idCardPositive = car_lic
										} else if(imgType==='back') {
											this.form.idCardBack = resDetail.data.savePath
											this.idCardBack = car_lic
										}
									}
								}
							},
							fail:(err)=>{
								console.log('err',err)
							}
						});
						
					}
				})
				
			},
			verifyMailFun(){
				if(formRegular('email',this.form.mail)) {
					this.verify.mail = false
				} else {
					this.verify.mail = true
				}
			},
			verifyPhoneFun(){
				if(formRegular('phone',this.form.phone)) {
					this.verify.phone = false
				} else {
					this.verify.phone = true
				}
			},
			verifyCityFun(){
				if(this.form.city != '') {
					this.verify.city = false
				} else {
					this.verify.city = true
				}
			},
			
			verifyPassFun(){
				const reg= /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*]{8,16}$/;
				if(reg.test(this.form.password)) {
					this.verify.password = false
				} else {
					this.verify.password = true
				}
			},
			
			verifyRealNameFun(){
				if(formRegular('chinese',this.form.realName) && this.form.realName != '') {
					this.verify.realName = false
				} else {
					this.verify.realName = true
				}
			},
			
			verifyIdCardPositiveFun(){
				if(this.form.idCardPositive == '' || this.form.idCardBack == '') {
					this.verify.idcardText = true
				} else {
					this.verify.idcardText = false
				}
			},
			
			verifyIdCardFun(){
				if(formRegular('idCard',this.form.idCard)) {
					this.verify.idCard = false
				} else {
					this.verify.idCard = true
				}
			},
			
			getProvinceList () {
				this.$http
					.post('stuh5/cityAndPro/province')
					.then(res => {
						this.provinceColumns = [res.data]
						this.getCityList(res.data[0])
					})
					.catch(err => {
						console.log(err);
					});
			},
			getCityList (data) {
				const cityPicker = this.$refs.cityPicker
				this.$http
					.post('stuh5/cityAndPro/city', { provinceId: data.id })
					.then(res => {
						this.cityColumns = res.data
						cityPicker.setColumnValues(1, res.data)
					})
					.catch(err => {
						console.log(err);
					});
			},
			changeHandler: debounce(function(e) {
				console.log(e)
				const {
					columnIndex,
					value,
					values, // values为当前变化列的数组内容
					index,
					// 微信小程序无法将picker实例传出来，只能通过ref操作
					picker = this.$refs.cityPicker
				} = e
				// 当第一列值发生变化时，变化第二列(后一列)对应的选项 
				if (columnIndex === 0) {
					// picker为选择器this实例，变化第二列对应的选项
					this.getCityList(this.provinceColumns[0][index])
					picker.setColumnValues(1, this.provinceColumns[0][index])
				}
			}, 100),
			confirm(e, type) {
				this.form.province = e.value[0].id
				this.form.city = e.value[1].id
				this.cityName = e.value[0].lable + '/' + e.value[1].lable
				this.verifyCityFun()
				this.visible.city = false
			},
			submit () {
				
				
				this.verifyRealNameFun()
				this.verifyMailFun()
				this.verifyPhoneFun()
				this.verifyIdCardFun()
				this.verifyIdCardPositiveFun()
				this.verifyCityFun()
				// this.verifyPassFun()
				
				// if(this.verify.password){
				// 	return false
				// }
		
				if(this.verify.idCard){
					return false
				}
				
				if(this.verify.realName){
					return false
				}
				
				if(this.verify.phone){
					return false
				}
				if(this.verify.mail){
					return false
				}
				
				// if (this.form.password!==this.form.passwordAgain)
				// return this.$util.showToast('两次输入密码不一致')
				
				this.form.user_id = this.userInfo.id;
				this.$http
					.post('stuh5/partner/updateToPartner', this.form)
					.then(res => {
						console.log(res)
						if (res.code === 200) {
							this.$util.showToast('提交成功')
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/home/home'
								})
							}, 2000)
						} else {
							this.$util.showToast(res.msg)
						}
					})
					.catch(err => {
						this.$util.showToast(err)
					});
			},
		}
	}
</script>

<style lang="scss" scoped>

.id-mask {
	position: fixed;
	top:0;
	left: 0;
	bottom: 0;
	right: 0;
	background-color: #fff;
	transform: translateY(100vh);
	transition: transform linear .2s;
	z-index: 999;
}

.id-expand {
	transform: translateY(0vh)
}

.idcard {
	padding: 40rpx;
	.card-wrap {
		border-radius: 8rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		margin-bottom: 40rpx;
		.add {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
		text {
			position: absolute;
			left: 50%;
			top: 74%;
			transform: translate(-50%, -74%);
			// color: #fff;
			font-size: 28rpx;
		}
	}
}
	
	

.head {
	display: inline-block;
	width: 100vw;
	height: 27vw;
}

.step-box {
	width: 70%;
	margin-left: 15%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 30rpx;
	.step-icon {
		display: inline-block;
		color: #fff;
		background-color: #b9150d;
		width: 48rpx;
		height: 48rpx;
		border-radius: 50%;
		font-size: 24rpx;
		line-height: 48rpx;
		text-align: center;
		font-weight: bold;
		margin-bottom: 20rpx;
	}
}



.arrow {
	position: relative;
	display: inline-block;
	width: 60rpx;
    border-bottom: 4rpx dashed #faa994;
	&::before {
		position: absolute;
		content: '';
		width:12rpx;
		height:12rpx;
		border-right: 4rpx solid #faa994;
		border-top: 4rpx solid #faa994;
		transform: rotate(45deg);
		top: -6rpx;
		right: -2rpx;
	}
}



.line-brach {
	width: 100vw;
	height: 20rpx;
	background-color: #F2F2F2;
}

.box {
	width:90%;
	margin-left:5%;
	margin-top:28rpx;
}

.input-title-img {
	width: 28rpx;
	height: 24rpx;
	margin-right: 10rpx;
}

.input-title-text {
	font-weight:bold;
}


.input-box {
	position: relative;
	display: flex;
	align-items: center;
	margin-bottom: 50rpx;
	.input-name {
		font-size: 30rpx;
		width: 150rpx;
		color: #999;
	}
	.input-content {
		border: 1rpx solid #fff;
		border-bottom: 1rpx solid #F2F2F2;
		margin-left:10rpx;
		padding:4rpx 20rpx;
		width: 84%;
		font-size: 28rpx;
		line-height: 56rpx;
		height: 56rpx;
		text-align: right;
	}
	.error-text {
		display: none;
		position: absolute;
		bottom: -40rpx;
		left:140rpx;
		font-size: 24rpx;
		color: #EB0909;
	}
}

.verify-box-err .error-text {
	display: inline-block;
}

.verify-box-err .input-content{
	background-color: rgba(235, 9, 9, .1);
	border:2rpx solid #BC292D;
	border-radius: 8rpx;
}

.arrow-after {
	position: absolute;
	display: inline-block;
	width: 16rpx;
	height: 16rpx;
	right: 0;
	border-right: 6rpx solid #999;
	border-top: 6rpx solid #999;
	transform: rotate(45deg);
}

.verify-box-err .arrow-after{
	display: none;
}


.sub-btn {
	width: 80%;
	margin-left: 10%;
	color:#fff;
	background-color: #BC292D;
	border-radius: 100rpx;
	margin-bottom: 40rpx;
}


.upload-tip {
	position: absolute;
	width: 78rpx;
	height: 32rpx;
	top:20rpx;
	left: 60rpx;
}
	
</style>
