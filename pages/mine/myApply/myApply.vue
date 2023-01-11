<template>
	<view>
		<view class="apply-wrap">
			<view class="item" v-for="item in applyList">
				<view class="title fz-28 fw-500 mb-10">{{item.NAME}} - {{item.MOBILE}}</view>
				<view class="row">
					<view>
						院校：<text>{{item.SCHOOL_NAME}}</text>
					</view>
					<view>
						专业：<text>{{item.SUBJECT_NAME}}</text>
					</view>
					<view>
						收费标准：<text class="color-red fw-500">{{item.FEE_STANDARD_MONEY / 100}}元</text>
					</view>
				</view>
				<view>
					备注：{{item.MEMO}}
				</view>
				<view class="mt-6">
					报名时间：{{item.time}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex';
	import dayjs from 'dayjs'
	// dayjs(item.gmtCreate).format('YYYY-MM-DD HH:mm:ss');
	export default {
		data() {
			return {
				applyList: []
			}
		},
		computed: {
			...mapGetters(['userInfo'])
		},
		onLoad() {
			this.getApplyList()
		},
		methods: {
			getApplyList() {
				this.$util.showLoading();
				const params = {
					ID: this.userInfo.ID
				};
				this.$http
					.get('user_center', params)
					.then(res => {
						if (res.code === 1) {
							console.log('用户信息：', res);
							// const data = res.data.rows;
							this.applyList = res.baoming.map(item => {
								item.time = dayjs(item.CREATE_TIME * 1000).format('YYYY-MM-DD HH:mm:ss');
								return item
							})
							this.$util.hideLoading();
						} else {
							this.$util.hideLoading();
						}
					})
					.catch(err => {
						console.log(err);
						this.$util.hideLoading();
					});
			},
		}
	}
</script>

<style scoped lang="less">
.apply-wrap {
	padding: 0 10px;
	.item {
		padding: 10px;
		border-bottom: 1rpx solid #eee;
		.row {
			view {
				margin-bottom: 6rpx;
			}
		}
	}
}
</style>
