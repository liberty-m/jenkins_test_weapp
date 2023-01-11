<template>
	<view class="global-wrap setting">
		<view class="person">
			<view @tap="selectPhoto()" class="cell info pb-10 h-80">
				<view class="mr-auto">头像</view>
				<view class="mr-10">
					<image v-if="userInfo.headUrl" class="w-100 h-100" :src="ossUrl + user.headUrl" mode="aspectFill"></image>
					<image class="w-110 h-110" v-else src="/static/images/mine/avatar.png" mode="aspectFill"></image>
				</view>
				<view class="iconfont color-999 fz-28 icon-youjiantou_huaban"></view>
			</view>
			<view @tap="showModel()" class="cell info pb-30 pt-30">
				<view class="mr-auto">昵称</view>
				<view class="color-999 mr-10">{{user.nickname}}</view>
				<view class="iconfont color-999 fz-28 icon-youjiantou_huaban"></view>
			</view>
			<view @tap="showSelectSex()" class="cell info pb-30 pt-30">
				<view class="mr-auto">性别</view>
				<view class="color-999 mr-10">{{user.sex === 0 ? '男' : '女'}}</view>
				<view class="iconfont color-999 fz-28 icon-youjiantou_huaban"></view>
			</view>
			<view @tap="showBirthdayTime()" class="cell info pt-30 border-none">
				<view class="mr-auto">出生年月</view>
				<view class="color-999 mr-10">{{user.birthdayTime}}</view>
				<view class="iconfont color-999 fz-28 icon-youjiantou_huaban"></view>
			</view>
		</view>
		<!-- 昵称修改模态窗 -->
		<u-modal :show="show" @confirm="confirm" ref="uModal" title="修改昵称" :asyncClose="true" confirmColor="#CB242B">
			<view>
				<u-input v-model="user.nickname" maxlength="15"></u-input>
			</view>
		</u-modal>
		<!-- 性别选择 -->
		<u-picker :show="sexShow" @close="sexCancel" @confirm="sexConfirm" closeOnClickOverlay
			:defaultIndex="sexDefaultIndex" @cancel="sexCancel" :columns="[sexColumns]" keyName="label" confirmColor="#BC292D"></u-picker>
		<!-- 年月日选择器 -->
		<u-datetime-picker :minDate="1980"  v-model="user.birthday" @confirm="datetimeConfirm" @cancel="datetimeCancel" closeOnClickOverlay @close="datetimeCancel"
			:show="datetimeShow"  mode="date" :formatter="formatter" confirmColor="#BC292D"></u-datetime-picker>

	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex'
	import dayjs from 'dayjs';
	import baseUrl from '@/utils/request/baseUrl.js'
	import { ossUrl } from '@/utils/util.js'
	export default {
		data() {
			return {
				ossUrl:ossUrl,
				datetimeShow: false,
				show: false,
				sexShow: false,
				sexDefaultIndex: [0],
				user: {},
				sexColumns: [{
					label: '男',
					id: 0,
				}, {
					label: '女',
					id: 1,
				}]
			};
		},
		computed: {
			...mapGetters({
				userInfo: 'userInfo'
			})
		},
		onLoad() {
			this.$http.post('stuh5/login/getInfo', {
					id: this.userInfo.id
				}).then(res => {
					if (res.code === 200) {
						console.log(res)
						this.user = res.data;
						this.user.birthdayTime = this.user.birthday?dayjs(this.user.birthday).format('YYYY年MM月DD日'):''
					} else {
						this.$util.showToast(res.msg)
					}
				})
				.catch(err => {
					this.$util.hideLoading();
				});
		},
		methods: {
			...mapMutations({
				setUserInfo: 'SET_USER_INFO'
			}),
			selectPhoto() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res)=>{
						uni.uploadFile({
							url: baseUrl + 'oss/upload', //仅为示例，非真实的接口地址
							filePath: res.tempFilePaths[0],
							name: 'file',
							formData: {
								pathType: 12,
							},
							success: (uploadFileRes) => {
								var data = JSON.parse(uploadFileRes.data)
								this.user.headUrl = data.data.savePath;
								this.modifyUserInfo()
							}
						});
					}
				});
			},
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`
				}
				if (type === 'month') {
					return `${value}月`
				}
				if (type === 'day') {
					return `${value}日`
				}
				return value
			},
			showBirthdayTime() {
				if(!this.user.birthday){
					this.user.birthday = new Date().getTime()
				}
				this.datetimeShow = true;
			},
			datetimeCancel() {
				this.datetimeShow = false;
			},
			datetimeConfirm(e) {
				this.user.birthdayTime = dayjs(e.value).format('YYYY年MM月DD日')
				this.user.birthday = e.value;
				this.modifyUserInfo();
				this.datetimeShow = false;
			},
			sexCancel() {
				this.sexShow = false;
			},
			sexConfirm(e) {
				this.user.sex = e.value[0].id;
				this.modifyUserInfo();
				this.sexShow = false;
			},
			showSelectSex() {
				this.sexColumns.forEach((f, i) => {
					if (f.id == this.user.sex) {
						this.sexDefaultIndex = [i]
					}
				})
				this.sexShow = true;
			},
			confirm() {
				this.modifyUserInfo()
				this.show = false;
			},
			modifyUserInfo() {
				var params = {
					id: this.user.id,
					headUrl: this.user.headUrl,
					nickname: this.user.nickname,
					sex: this.user.sex,
					email: this.user.email,
					birthday: this.user.birthday
				}
				this.$http
					.post('stuh5/login/updateInfo', params)
					.then(res => {
						if (res.code === 200) {
							this.setUserInfo({
								...this.userInfo,
								...params})
							this.$util.showToast('修改成功');
						} else {
							this.$util.showToast(res.msg);
						}
					})
					.catch(err => {
						console.log(err);
						this.$util.hideLoading();
					});
			},
			showModel() {
				this.show = true;
			}
		}
	}
</script>

<style lang="scss">
	.setting {
		padding: 20rpx;
		font-size: 28rpx;

		.person {
			background-color: #fff;
			padding: 20rpx;
			border-radius: 16rpx;

			.cell {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 0;

				image {
					position: relative;
					top: -10rpx;
					border-radius: 50%;
				}

				&.info {
					border-bottom: 1rpx solid #F2F2F2;
				}
			}

			.info {}
		}
	}
</style>
