<template>
	<view class="">
		<view class="fz-28 ml-38 mt-30 color-red">提交后，猎学网将为您智能推荐课程。</view>
		<view class="input-wrap">
			<view class="input-box" :class="{ 'verify-box-err': verify.stuName }">
				<text class="input-name">真实姓名</text>
				<input class="input-content" placeholder="姓名（必填）" type="text" @input="passFun('stuName')" @blur="passFun('stuName')" v-model="form.stuName" />
				<text v-if="verify.stuName" class="error-text">请输入姓名</text>
			</view>
			<view class="input-box" :class="{ 'verify-box-err': verify.stuPhone || form.verifyPhone }">
				<text class="input-name">手机号</text>
				<input class="input-content" placeholder="请输入手机号" type="text" @input="passFun('stuPhone')" @blur="passFun('stuPhone')" v-model="form.stuPhone" />
				<text v-if="!form.stuPhone" class="error-text">请输入手机号</text>
				<text v-else-if="verify.verifyPhone" class="error-text">手机号码不正确，请重新输入</text>
			</view>
			<!-- :style="selectCourseData.ifEducation !== 1 && 'margin-top: -20rpx;'" -->
			<view class="input-box category"  @tap="visible.showPopup = true">
				<text class="input-name">意向课程类别</text>
				<input class="input-content" disabled placeholder="请选择意向课程类别" type="text" v-model="courseName" />
				<text class="iconfont icon-youjiantou_huaban"></text>
			</view>
			<view class="category-wrap" v-if="selectCourseData.ifEducation === 1">
				<view class="input-box" @tap="visible.level = true">
					<text class="input-name">意向学历层次</text>
					<input class="input-content" disabled="" placeholder="请选择意向学历层次" type="text" v-model="inteEducationLevelName" />
					<text class="iconfont icon-youjiantou_huaban"></text>
				</view>
				<view class="input-box" @tap="visible.school = true">
					<text class="input-name">意向院校</text>
					<input class="input-content" disabled placeholder="请选择意向院校" type="text" v-model="form.inteSchoolName" />
					<text class="iconfont icon-youjiantou_huaban"></text>
				</view>
				<view class="input-box">
					<text class="input-name">意向专业</text>
					<input class="input-content" placeholder="请输入意向专业" type="text" v-model="form.inteSubjectName" />
					<text class="iconfont icon-youjiantou_huaban visible-hidden"></text>
				</view>
			</view>
			<view class="input-box" @tap="visible.city = true">
				<text class="input-name">意向城市</text>
				<input class="input-content" disabled placeholder="省、市（必填）" type="text" v-model="cityName" />
				<text class="iconfont icon-youjiantou_huaban"></text>
			</view>
			<view class="input-box" @tap="visible.status = true">
				<text class="input-name">个人状态</text>
				<input class="input-content" disabled placeholder="在学/在职/自由职业/" type="text" v-model="personalName" />
				<text class="iconfont icon-youjiantou_huaban"></text>
			</view>
		</view>
		<view class="instruction">
			<view>
				<u--textarea v-model="form.briefSituation" height="110" count maxlength="200" placeholder="您可以简要说明您的情况，以便为您提供更好的服务~" border="surround"></u--textarea>
			</view>
		</view>
		<view class="lx-btn-wrap lx-btn-90 mb-100">
			<u-button :loading="isLoading" class="lx-btn m-auto" type="primary" text="提交" @tap="submit"></u-button>
			<!-- <view class="lx-btn block wb-90 m-auto mt-50 lt-s-4 fz-32" @tap="submit">提交</view> -->
		</view>
		<!-- 意向课程类别 -->
		<u-popup :show="visible.showPopup" closeable :round="10" mode="bottom" closeOnClickOverlay @close="closePopup" @open="openPopup">
			<view class="fz-32 fw-500 text-center pt-26">选择意向课程类别</view>
			<view class="pb-50">
				<tui-cascade-selection
					checkMarkColor="#BC292D"
					textColor="#999999"
					textActiveColor="#BC292D"
					color="#333"
					activeColor="#BC292D"
					lineColor="#BC292D"
					height="200px"
					:itemList="itemList"
					@change="selectCourse"
					@complete="complete">
				</tui-cascade-selection>
			</view>
			<!-- <view style="position: relative; top: -40rpx;"
				  class="lx-btn block wb-80 m-auto mt-50 lt-s-4 fz-32"
				  @tap="saveCategory">保存</view> -->
		</u-popup>
		<!-- 意向学历层次 -->
		<u-picker 
			:show="visible.level"
			@close="visible.level = false"
			@cancel="visible.level = false"
			closeOnClickOverlay
			ref="levelPicker"
			keyName="lable"
			confirmColor="#BC292D"
			:columns="levelColumns"
			@confirm="(e) => confirm(e, 'level')">
		</u-picker>
		<!-- 意向院校 -->
		<u-picker 
			:show="visible.school"
			@close="visible.school = false"
			@cancel="visible.school = false"
			closeOnClickOverlay
			ref="schoolPicker"
			keyName="schoolName"
			confirmColor="#BC292D"
			:columns="schoolColumns"
			@confirm="(e) => confirm(e, 'school')">
		</u-picker>
		<!-- 意向城市 -->
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
		<!-- 个人状态 -->
		<u-picker
			:show="visible.status"
			@close="visible.status = false"
			@cancel="visible.status = false"
			closeOnClickOverlay
			ref="statusPicker"
			keyName="lable"
			confirmColor="#BC292D"
			:columns="statusColumns"
			@confirm="(e) => confirm(e, 'status')">
		</u-picker>
	</view>
</template>

<script>
// import city from '@/utils/city.js';
import { mapGetters } from 'vuex'
import cityData from '@/utils/picker.city.js';
import { debounce } from '@/utils/util.js'
import tuiCascadeSelection from "@/pages_ani/components/thorui/tui-cascade-selection/tui-cascade-selection"
export default {
	name: 'findCourse',
	components: { tuiCascadeSelection },
	data() {
		return {
			itemList: [],
			personalName: '',
			cityName: '',
			statusName: '',
			inteEducationLevelName: '',
			selectCourseData: {},
			courseName: '',
			isClickSave: false,
			isLoading: false,
			form: {
				stuName: '', // 真实姓名
				stuPhone: '', // 电话
				inteCourseTypeId: '', // 意向课程类目id
				inteSchoolId: '',  // 意向学校id
				inteSchoolName: '',  // 意向学校
				inteEducationLevel: '', // 意向学历层次
				inteCourse1: '', // 一级意向课程类型
				inteCourse2: '', // 二级意向课程类型
				inteCourse3: '', // 三级意向课程类型
				inteCourse1Id: '', // 一级意向课程类型id
				inteCourse2Id: '', // 二级意向课程类型id
				inteCourse3Id: '', // 三级意向课程类型id
				inteProvinceName: '', // 意向省份名称
				inteProvinceId: '', // 意向省份id
				inteCityId: '', // 意向城市id
				inteCityName: '', // 意向城市名称
				personalStatus: '', // 个人状态
				briefSituation: '' // 简要情况
			},
			verify: {
				stuName: false,
				stuPhone: false,
				verifyPhone: false
			},
			visible: {
				showPopup: false,
				school: false,
				level: false,
				category: false,
				city: false,
				status: false
			},
			provinceColumns: [],
			cityColumns: [],
			schoolColumns: [],
			// 1初中、2高中(中专)、3专科（高职）、4本科、5硕士研究生、6博士研究生
			levelColumns: [
				[
					{ lable: '初中', value: 1 },
					{ lable: '高中(中专)', value: 2 },
					{ lable: '专科（高职）', value: 3 },
					{ lable: '本科', value: 4 },
					{ lable: '硕士研究生', value: 5 },
					{ lable: '博士研究生', value: 6 }
				]
			],
			statusColumns: [
				[
					{ lable: '上班', value: 1 },
					{ lable: '求职', value: 2 },
					{ lable: '实习', value: 3 },
					{ lable: '在校生', value: 4 },
					{ lable: '其他', value: 5 }
				]
			]
		};
	},
	onReady() {
		
	},
	computed: {
		...mapGetters(['userInfo'])
	},
	onLoad(options) {
		// console.log(city);
		this.form.stuName = this.userInfo.nickname
		this.form.stuPhone = this.userInfo.phone
		this.getProvinceList()
		this.getSchoolList()
		this.getCourseList()
		if (options.from === 'mine') {
			uni.setNavigationBarTitle({
				title: '求学意向'
			});
			this.getintention()
		} else {
			uni.setNavigationBarTitle({
				title: '报名'
			});
		}
	},
	// watch: {
	// 	isClickSave(newVal) {
	// 		console.log('click: ', newVal)
	// 	}
	// },
	methods: {
		getintention () {
			this.$http
				.post('stuh5/stuInte/selectOneByUserId', {})
				.then(res => {
					console.log('意向：', res)
					const data = res.data;
					this.form.stuName = data.stuName
					this.form.stuPhone = data.stuPhone
					this.form.inteCourse1Id = data.inteCourse1Id
					this.form.inteCourse2Id = data.inteCourse2Id
					this.form.inteCourse3Id = data.inteCourse3Id
					this.form.inteSchoolId = data.inteSchoolId
					this.form.inteProvinceId = data.inteProvinceId
					this.form.inteCityId = data.inteCityId
					this.cityName = `${data.inteProvinceName}/${data.inteCityName}`
					this.form.inteProvinceName = data.inteProvinceName
					this.form.inteCityName = data.inteCityName
					this.selectCourseData.ifEducation = data.inteCourse1Id === 1 ? 1 : 0
					this.courseName = `${data.inteCourse1}/${data.inteCourse2}/${data.inteCourse3}`
					this.form.inteCourse1 = data.inteCourse1
					this.form.inteCourse2 = data.inteCourse2
					this.form.inteCourse3 = data.inteCourse3
					this.form.personalStatus = data.personalStatus
					this.form.inteEducationLevel = data.inteEducationLevel
					this.form.inteSchoolName = data.inteSchoolName
					this.form.inteSubjectName = data.inteSubjectName
					this.form.briefSituation = data.briefSituation
					this.personalName = this.statusColumns[0].filter(v => v.value === data.personalStatus)[0].lable
					this.inteEducationLevelName = this.levelColumns[0].filter(v => v.value === data.inteEducationLevel)[0].lable
					
				})
				.catch(err => {
					console.log(err);
				});
		},
		getCourseList () {
			this.$http
				.post('category/findCourse/querySelect', {})
				.then(res => {
					console.log('课程：', res)
					this.itemList = res.data
				})
				.catch(err => {
					console.log(err);
				});
		},
		getSchoolList () {
			this.$http
				.post('stuh5/school/list', { status: 1 })
				.then(res => {
					this.schoolColumns = [res.data]
				})
				.catch(err => {
					console.log(err);
				});
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
		}, 300),
		// 回调参数为包含columnIndex、value、values
		confirm(e, type) {
			if (type === 'level') {
				this.inteEducationLevelName = e.value[0].lable
				this.form.inteEducationLevel = e.value[0].value
				this.visible.level = false
			} else if (type === 'school') {
				this.form.inteSchoolName = e.value[0].schoolName
				this.form.inteSchoolId = e.value[0].id
				this.visible.school = false
			} else if (type === 'city') {
				this.form.inteProvinceName = e.value[0].lable
				this.form.inteProvinceId = e.value[0].id
				this.form.inteCityName = e.value[1].lable
				this.form.inteCityId = e.value[1].id
				this.cityName = this.form.inteProvinceName + '/' + this.form.inteCityName
				setTimeout(() => {
					this.visible.city = false
				}, 300)
			} else {
				this.personalName = e.value[0].lable
				this.form.personalStatus = e.value[0].value
				this.visible.status = false
			}
		},
		submit: debounce(function () {
			if (!this.form.stuName) return this.$util.showToast('真实姓名必填')
			if (!this.form.stuPhone) return this.$util.showToast('手机号码必填')
			if (this.verify.verifyPhone) return this.$util.showToast('手机号码不正确')
			if (!this.courseName) return this.$util.showToast('请选择意向课程类别')
			if (this.selectCourseData.ifEducation === 1) {
				if (!this.inteEducationLevelName) {
					return this.$util.showToast('请选择意向学历层次')
				}
				if (!this.form.inteSchoolName) {
					return this.$util.showToast('请选择意向院校')
				}
				if (!this.form.inteSubjectName) {
					return this.$util.showToast('请填写意向专业')
				}
			}
			if (!this.form.inteCityId) return this.$util.showToast('请选择意向城市')
			if (!this.form.personalStatus) return this.$util.showToast('请选择个人状态')
			this.isLoading = true
			const data = {
				"stuName": this.form.stuName,				"stuPhone": this.form.stuPhone,
				"inteCourse1": this.form.inteCourse1,				"inteCourse2": this.form.inteCourse2,				"inteCourse3": this.form.inteCourse3,
				"inteCourse1Id":  this.form.inteCourse1Id,				"inteCourse2Id":  this.form.inteCourse2Id,				"inteCourse3Id":  this.form.inteCourse3Id,				"inteProvinceId": this.form.inteProvinceId,				"inteProvinceName": this.form.inteProvinceName,				"inteCityId": this.form.inteCityId,				"inteCityName": this.form.inteCityName,				"personalStatus": this.form.personalStatus,				"inteEducationLevel": this.form.inteEducationLevel,				"inteSchoolId": this.form.inteSchoolId,				"inteSchoolName": this.form.inteSchoolName,				// "inteSubjectId": this.form.inteSubjectId,				"inteSubjectName": this.form.inteSubjectName,				"briefSituation": this.form.briefSituation
			}
			console.log(data)
			console.log(JSON.stringify(data))
			this.$util.showLoading(true)
			this.$http
				.post('stuh5/stuInte/save', data)
				.then(res => {
					console.log(res)
					if (res.code === 200) {
						this.$util.showToast('提交成功')
						setTimeout(() => {
							uni.switchTab({
								url: '../home/home'
							})
						}, 1000)
					} else {
						this.$util.showToast(res.msg)
						this.$util.hideLoading()
					}
					setTimeout(() => {
						this.isLoading = false
					}, 3000)
				})
				.catch(err => {
					console.log(err);
					this.$util.hideLoading()
					this.isLoading = false
				});
		}, 300),
		saveCategory () {
			this.isClickSave = true
			this.visible.showPopup = false
		},
		closePopup () {
			this.isClickSave = false
			this.visible.showPopup = false
		},
		openPopup () {
			
		},
		selectCourse (e) {
			// console.log(e)
			if (!('result' in e)) {
				this.selectCourseData = e
			}
		},
		complete(e) {
			console.log('complete: ', e);
			if ('result' in e) {
				this.form.inteCourse1 = e.result[0].text
				this.form.inteCourse2 = e.result[1].text
				this.form.inteCourse3 = e.result[2].text
				this.form.inteCourse1Id = e.result[0].value
				this.form.inteCourse2Id = e.result[1].value
				this.form.inteCourse3Id = e.result[2].value
				this.courseName = e.result.map(v => v.text).join('/')
				this.visible.showPopup = false
				// if (this.isClickSave) {
				// }
			}
			
		},
		passFun(name) {
			if (!this.form[name]) {
				this.verify[name] = true;
			} else {
				this.verify[name] = false;
			}
			if (name === 'stuPhone') {
				const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if (reg.test(this.form[name])) {
					this.verify.verifyPhone = false
					this.verify[name] = false
				} else {
					this.verify.verifyPhone = true
					this.verify[name] = true
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.input-wrap {
	width: 90%;
	margin-left: 5%;
	margin-top: 28rpx;
}

.input-title-img {
	width: 28rpx;
	height: 24rpx;
	margin-right: 10rpx;
}

.input-title-text {
	font-weight: bold;
}


.input-box {
	position: relative;
	display: flex;
	align-items: center;
	margin-bottom: 50rpx;
	&.category {
		// margin-bottom: 20rpx;
	}
	.input-name {
		font-size: 32rpx;
		width: 240rpx;
		font-weight: bold;
	}
	.input-content {
		border: 1rpx solid #fff;
		border-bottom: 1rpx solid #f2f2f2;
		margin-left: 30rpx;
		padding: 4rpx 20rpx;
		width: 65%;
		font-size: 28rpx;
		line-height: 56rpx;
		height: 56rpx;
		text-align: right;
	}
	.error-text {
		display: none;
		position: absolute;
		bottom: -40rpx;
		left: 246rpx;
		font-size: 24rpx;
		color: #eb0909;
	}
}

.category-wrap {
	border: 1rpx solid rgba($color: $color-red, $alpha: 0.4);
	border-radius: 16rpx;
	padding: 0rpx 30rpx;
	margin-bottom: 36rpx;
	.input-content {
		width: 78%;
	}
	.input-name {
		font-size: 24rpx !important;
	}
	.input-box:last-child {
		margin-bottom: 10rpx;
	}
}


.verify-box-err .error-text {
	display: inline-block;
}

.verify-box-err .input-content {
	background-color: rgba(235, 9, 9, 0.1);
	border: 2rpx solid #bc292d;
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

.verify-box-err .arrow-after {
	display: none;
}
.instruction {
	padding: 20rpx 40rpx;
	background-color: #fff;
	margin-top: 16rpx;
	/deep/ .u-textarea {
		background-color: #fbfbfb;
		border-color: #f2f2f2 !important;
		border-radius: 20rpx !important;
	}
	/deep/ .input-placeholder {
		font-size: 28rpx;
		color: #999;
	}
	/deep/ .u-textarea__count {
		color: #999;
		background-color: initial !important;
	}
}
</style>
