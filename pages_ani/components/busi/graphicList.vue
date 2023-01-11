<template>
	<view class="graphic-wrap">
		<template v-if="showType === 'list'">
			<view class="list-wrap">
				<view class="header">
					<view class="title fz-28">
						<image src="/static/images/school-icon.png" mode=""></image>
						<view class="u-line-1 w-420">黎明大学猎学教育中心黎明大学猎学教育中心</view>
					</view>
					<view class="color-red">待审核</view>
				</view>
				<view class="content">
					<!-- <view class="img-wrap"><image src="../../static/images/test/redund.png" mode="aspectFill"></image></view> -->
					<view class="text">
						<view class="title fz-28 fw-500 mb-5 u-line-1 w-420">2022年大连理工大学网络教2022年大连理工大学网络教</view>
						<view class="txt color-999 mb-5 u-line-2 w-420">2022学年/计算机网络专业/预缴报 名费2022学年/计算机网络专业/预缴报 名费</view>
						<view class="refund-money">
							<text class="fz-28 mr-10">申请退款</text>
							<text class="fz-36 fw-500 color-red">¥ 1380.00</text>
						</view>
					</view>
				</view>
				<view class="g-line"></view>
				<view class="list-footer">
					<text class="fz-28 mr-20">退款中</text>
					<text class="color-999 u-line-1 w-480">机构已通过您的退款申请，正在退款中机构已通过您的退款申请，正在退款中</text>
					<view class="color-999 iconfont icon-youjiantou_huaban"></view>
				</view>
			</view>
		</template>
		<template v-else-if="showType === 'refund'">
			<view class="list-wrap" v-for="item in list" @tap="$emit('click-item', item)">
				<view class="header">
					<view class="title fz-28">
						<image src="/static/images/school-icon.png" mode=""></image>
						<view class="u-line-1 w-420">{{item.mechName}}</view>
					</view>
					<view class="color-red" v-if="item.orderAftersale">{{dicAftersaleStatus[item.orderAftersale.aftersaleStatus]}}</view>
				</view>
				<view class="content">
					<view class="img-wrap">
						<image :src="ossUrl + item.orderItems[0].mainPic" mode="scaleToFill"></image>
					</view>
					<view class="text">
						<view class="title fz-28 fw-500 mb-5 u-line-1 w-420">{{item.orderItems[0].courName}}</view>
						<view class="txt color-999 mb-5 u-line-2 w-420">
							{{item.orderItems[0].gradeName}}/{{item.orderItems[0].subjectName}}/{{item.payMethod === 1 ? '全款' : '预缴报名费'}}
						</view>
						<view class="refund-money">
							<text class="fz-28 mr-10">申请退款</text>
							<text v-if="item.orderAftersale" class="fz-36 fw-500 color-red">¥ {{item.orderAftersale.amount / 100}}</text>
						</view>
					</view>
				</view>
				<view class="g-line"></view>
				<view class="list-footer flex">
					<text class="fz-28 mr-auto" v-if="item.orderAftersale">{{dicAftersaleStatus[item.orderAftersale.aftersaleStatus]}}</text>
					<!-- <text class="color-999 u-line-1 w-480">{{item.orderAftersale.remark}}</text> -->
					<view class="color-999 iconfont icon-youjiantou_huaban"></view>
				</view>
			</view>
		</template>
		<template v-else-if="showType === 'detail'">
			<view class="detail-wrap">
				<view class="header">
					<view class="title fz-32 fw-500">
						<view class="gradient"></view>
						<view class="u-line-1 w-420">{{detail.schoolName}}</view>
					</view>
					<view class="color-red" v-if="from !== 'refund'">{{dicOrderStatus[detail.orderStatus]}}</view>
				</view>
				<view class="content" v-if="detail.orderItems">
					<view class="img-wrap">
						<image :src="ossUrl + detail.orderItems[0].mainPic" mode="scaleToFill"></image>
					</view>
					<view class="text">
						<view class="title fz-28 fw-500 mb-5 u-line-1 w-420">{{detail.orderItems[0].courName}}</view>
						<view class="txt color-999 mb-5 u-line-2 w-420">
							{{detail.orderItems[0].gradeName}}/{{detail.orderItems[0].subjectName}}/{{detail.payMethod === 1 ? '全款' : '预缴报名费'}}
						</view>
						<view class="tag">
							<view class="mr-10">
								<u-tag color="#CB242B" borderColor="#CB242B" size="mini" text="7天无理由退换货" plain shape="circle"></u-tag>
							</view>
							<view class="mr-10">
								<u-tag color="#CB242B" borderColor="#CB242B" size="mini" text="平台担保" plain shape="circle"></u-tag>
							</view>
						</view>
					</view>
				</view>
				<view class="g-line"></view>
				<view class="detail-footer">
					<view>总费用 ¥ {{detail.orderItems[0].allPrice / 100}}</view>
					<view class="ml-15">
						已支付 <text class="color-red ml-10">¥ {{detail.payAmount / 100}}</text>
					</view>
					<!-- <view class="ml-15" v-if="detail.orderStatus === 0 && detail.payMethod === 0">
						待支付报名费 <text class="color-red ml-10">¥ {{detail.payAmount / 100}}</text>
					</view>
					<view class="ml-15" v-if="detail.orderStatus === 0 && detail.payMethod === 1">
						待支付全款 <text class="color-red ml-10">¥ {{detail.payAmount / 100}}</text>
					</view>
					<view class="ml-15" v-if="detail.orderStatus === 1">
						待支付尾款 <text class="color-red ml-10">¥ {{detail.payAmount / 100}}</text>
					</view> -->
				</view>
				<!-- <view class="detail-footer">
					<view>总费用¥ 9680，</view>
					<view>已支付¥ 9680，</view>
					<view>待支付尾款¥ 9680</view>
				</view> -->
			</view>
		</template>
		<template v-else-if="showType === 'collection'">
			<view class="detail-wrap collection" v-for="(item, index) in list" :key="index" @tap="$emit('click-item', item)">
				<view class="header">
					<view class="title fz-28">
						<image src="/static/images/school-icon.png" mode=""></image>
						<view class="u-line-1 w-420">{{item.courName}}</view>
					</view>
					<view class="color-999"></view>
					<view class="color-999 fw-500 iconfont icon-youjiantou_huaban mt-5 ml-5"></view>
				</view>
				<view class="content">
					<view class="img-wrap">
						<image :src="ossUrl + item.mainPic" mode="scaleToFill"></image>
					</view>
					<view class="text">
						<view class="title fz-28 fw-500 mb-5 u-line-2 w-420">{{item.courName}}</view>
						<!-- <view class="txt color-999 mb-5 u-line-2 w-420">2022学年/计算机网络专业/预缴报 名费2022学年/计算机网络专业/预缴报 名费</view> -->
						<view class="tag">
							<view class="mr-10" v-if="!item.ifFail == 1">
								<u-tag v-if="isHistory == false" color="#CB242B" borderColor="#CB242B" size="mini" text="已上架" plain shape="circle"></u-tag>
								<u-tag v-else color="#CB242B" borderColor="#CB242B" size="mini" :text="item.category4Name ? item.category4Name : (item.category3Name ? item.category3Name : (item.category2Name ? item.category2Name : item.category1Name))" plain shape="circle"></u-tag>
							</view>
							<view class="failure" v-else>
								已失效
							</view>
						</view>
					</view>
				</view>
				<!-- <view class="g-line"></view> -->
				<view class="collection-footer">
					<template v-if="track">
						<view class="color-999">已报名{{item.sortNum}}人</view>
					</template>
					<template v-else>
						<view class="color-999">已报名{{item.signupNum}}人</view>
					</template>
					<view class="color-red fz-32 fw-500">￥{{item.money / 100}}</view>
				</view>
			</view>
		</template>
		<template v-else-if="showType === 'institution'">
			<view class="institution">
				<view class="item" v-for="(item, index) in list" @tap="$emit('click-item', item)">
					<view class="info">
						<view class="img-wrap mr-20">
							<image v-if="item.mechanismLogo" :src="ossUrl + item.mechanismLogo" mode="scaleToFill"></image>
							<image v-else :src="ossUrl + item.shopLogo" mode=""></image>
							<!-- <view class="number"><text>已报名150</text></view> -->
						</view>
						<view>
							<view class="fz-32 fw-500 u-line-1 w-430">{{item.managementName}}</view>
							<view class="tag">
								<view class="mr-10 mb-10" v-for="(lable, labelIndex) in item.lables" v-if="labelIndex <= 5">
									<u-tag color="#CB242B" @click="$emit('click-item', item)" borderColor="#CB242B" size="mini" :text="lable" plain shape="circle"></u-tag>
								</view>
							</view>
							<view class="color-333 pt-10 fz-24 fw-500" v-if="item.signupNum">
								<text class="u-line-1 w-320">已报名 {{item.signupNum}}</text>
							</view>
							
						</view>
					</view>
					<view class="color-333 pt-20 location">
						<text class="iconfont icon-weizhi"></text>
						<text class="u-line-1 w-520 inline-block color-999">{{item.address}}</text>
						<text class="color-999"></text>
					</view>
					<view class="subject">
						<view class="row" v-for="course in item.courseList">
							<view class="ke">
								<text>课</text>
							</view>
							<view class="course fw-500">
								<text class="inline-block u-line-1 w-320">{{course.courName}}</text>
							</view>
							<view class="sub_title">{{course.money / 100}}</view>
						</view>
						<!-- <view class="row">
							<view class="ke">
								<text>课</text>
							</view>
							<view class="course fw-500">
								<text class="inline-block u-line-1 w-420">福州成人高考（函授）经管专业招福州成人高考（函授）经管专业招</text>
							</view>
							<view class="sub_title">¥ 1680</view>
						</view> -->
					</view>
				</view>
			</view>
		</template>
		<template v-else-if="showType === 'order'">
			<view class="detail-wrap order mb-15" v-for="item in list">
				<view class="header">
					<view class="title fz-28">
						<image class="w-32 h-32" src="/static/images/school-icon.png" mode=""></image>
						<!-- <view class="gradient"></view> -->
						<view class="u-line-1 w-420">{{item.schoolName}}</view>
					</view>
					
					<view :class="item.orderStatus === 4 ? 'color-999' : 'color-red'">{{dicOrderStatus[item.orderStatus]}}</view>
					<!-- <view class="color-red">{{item.orderStatus}}</view> -->
				</view>
				<view class="content" @tap="$emit('click-item', item)">
					<view class="img-wrap">
						<image :src="ossUrl + item.orderItems[0].mainPic" mode="scaleToFill"></image>
					</view>
					<view class="text">
						<view class="title fz-28 fw-500 mb-5 u-line-1 w-420">{{item.orderItems[0].courName}}</view>
						<view class="txt color-999 mb-5 u-line-2 w-420">
							{{item.orderItems[0].gradeName}}/{{item.orderItems[0].subjectName}}/{{item.payMethod === 1 ? '全款' : '预缴报名费'}}
						</view>
						<view class="mt-4 mb-4 color-999">{{item.name}}</view>
						<view class="tag">
							 <!-- v-for="label in item.orderItems[0].labels" -->
							<view class="mr-10">
								<u-tag color="#CB242B" borderColor="#CB242B" size="mini" text="7天无理由退换货" plain shape="circle"></u-tag>
							</view>
							<view class="mr-10">
								<u-tag color="#CB242B" borderColor="#CB242B" size="mini" text="平台担保" plain shape="circle"></u-tag>
							</view>
						</view>
					</view>
				</view>
				<view class="fz-28 flex-between flex-center mt-10">
					<view :class="item.orderStatus !== 1 && 'text-right wb-100'" v-if="item.orderStatus !== 0 && item.orderStatus !== 4">
						已支付 <text class="color-red fw-500 ml-10">¥ {{item.payAmount / 100}}</text>
					</view>
					<view class="ml-auto">
						<template v-if="item.orderStatus === 0 && item.payMethod === 1">
							<view class="fw-500 ml-auto">待支付 <text class="color-red fz-36 ml-10">¥ {{item.orderItems[0].allPrice / 100}}</text></view>
						</template>
						<template v-if="item.orderStatus === 0 && item.payMethod === 0">
							<view class="fw-500 ml-auto">待支付 <text class="color-red fz-36 ml-10">¥ {{item.orderItems[0].price / 100}}</text></view>
						</template>
						<view v-if="item.orderStatus === 1" class="fw-500">待支付尾款 <text class="color-red fz-36 ml-10">¥ {{item.finalPayment / 100}}</text></view>
					</view>
				</view>
				<view class="color-999 text-right">总费用￥{{item.orderItems[0].allPrice / 100}}</view>
				<view class="g-line pt-10 mb-10"></view>
				<view class="detail-footer">
					<view class="lx-btn plain gray h-56 lh-56" @tap="$emit('click-button', item, '', 'view')">
						查看详情
					</view>
					<view v-if="item.orderStatus === 1 || item.orderStatus === 2" class="lx-btn plain gray ml-20 h-56 lh-56" @tap="$emit('click-button', item, '', 'refund')">
						售后/退款
					</view>
					<view v-if="item.orderStatus === 0" class="lx-btn plain gray ml-20 h-56 lh-56" @tap="$emit('click-button', item, '', 'cancel')">
						取消订单
					</view>
					<view v-if="item.orderStatus === 0 && item.payMethod === 0" class="lx-btn plain ml-20 h-56 lh-56" @tap="$emit('click-button', item, 'pay', 'payEntry')">
						支付报名费
					</view>
					<view v-if="item.orderStatus === 0 && item.payMethod === 1" class="lx-btn plain ml-20 h-56 lh-56" @tap="$emit('click-button', item, 'pay', 'payAll')">
						支付全款
					</view>
					<view v-if="item.orderStatus === 1" class="lx-btn plain ml-20 h-56 lh-56" @tap="$emit('click-button', item, 'pay', 'payFinal')">
						支付尾款
					</view>
					<view v-if="item.orderStatus === 4 || item.orderStatus === 6" class="lx-btn plain ml-20 h-56 lh-56" @tap="$emit('click-button', item, 'pay', 'payAgain')">
						再次购买
					</view>
					<!-- <view v-if="item.orderStatus === 2" class="lx-btn plain ml-20 h-56 lh-56" @tap="$emit('click-button', item, '', 'enter')">
						确认入学
					</view> -->
				</view>
			</view>
		</template>
	</view>
</template>

<script>
import { ossUrl } from '@/utils/util.js'
export default {
	props: {
		showType: {
			type: String,
			default: 'list'
		},
		from: {
			type: String,
			default: 'detail'
		},
		list: {
			type: Array
		},
		detail: {
			type: Object
		},
		track: {
			type: Boolean,
			default: false
		},
		isHistory: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			ossUrl,
			// 1：待审核，2：退款中，3：退款成功，4：拒绝退款，5：客服协商仲裁，6：售后关闭
			dicAftersaleStatus: {
				1: '待审核',
				2: '退款中',
				3: '退款成功',
				4: '拒绝退款',
				5: '客服协商仲裁',
				6: '售后关闭',
			},
			dicOrderStatus: {
				0: '待支付',
				1: '待付尾款',
				2: '付款完成',
				3: '已入学',
				4: '已取消',
				5: '售后',
				6: '交易关闭'
			}
		};
	}
};
</script>

<style lang="scss" scoped>
.graphic-wrap {
	.detail-wrap {
		padding: 20rpx;
		background-color: #fff;
		&.collection {
			border-radius: 20rpx;
			background-color: #fff;
			padding: 20rpx;
			margin-bottom: 20rpx;
		}
	}
	.list-wrap {
		border-radius: 20rpx;
		background-color: #fff;
		padding: 20rpx;
		margin-bottom: 20rpx;
	}
	.header {
		display: flex;
		align-items: center;
		height: 40rpx;
		margin-bottom: 20rpx;
		// .gradient {
		// 	width: 8rpx;
		// 	height: 40rpx;
		// 	background: linear-gradient(to bottom, #ec2c32, #ffb3a2 70%);
		// 	margin-right: 10rpx;
		// }
		.title {
			display: flex;
			align-items: center;
			margin-right: auto;
			image {
				width: 32rpx;
				height: 32rpx;
				margin-right: 10rpx;
			}
		}
	}
	.content {
		display: flex;
		.img-wrap {
			width: 254rpx;
			height: 144rpx;
			margin-right: 20rpx;
			margin-top: 8rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.tag {
			display: flex;
			.failure {
				border-radius: 40rpx;
				padding: 5rpx 16rpx;
				color: #999;
				background-color: #F2F2F2;
			}
		}
		.refund-money {
			display: flex;
			justify-content: flex-end;
			align-items: center;
		}
	}
	.g-line {
		padding-top: 26rpx;
		margin-bottom: 20rpx;
		border-bottom: 1rpx solid #f2f2f2;
	}
	.detail-footer {
		display: flex;
		justify-content: flex-end;
	}
	.list-footer {
		display: flex;
		align-items: center;
		height: 62rpx;
		background-color: #FBFBFB;
		padding: 5rpx 10rpx;
		border-radius: 8rpx;
		view {
			margin-left: auto;
		}
	}
	.collection-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 10rpx;
	}
	
	.institution {
		.item {
			padding: 20px 10px 0px 10px;
			background-color: #fff;
			margin-bottom: 15rpx;
			border-radius: 16rpx;
			image {
				width: 180rpx;
				height: 180rpx;
			}
			.info {
				.img-wrap {
					width: 208rpx;
					position: relative;
					image {
						// border-radius: 50%;
						border-radius: 16rpx;
					}
					.number {
						position: absolute;
						left: 0;
						bottom: 0;
						width: 180rpx;
						height: 40rpx;
						line-height: 40rpx;
						text-align: center;
						color: #fff;
						border-bottom-left-radius: 10rpx;
						border-bottom-right-radius: 10rpx;
						background-color: rgba($color: #333, $alpha: 0.5);
					}
				}
				display: flex;
				.tag {
					display: flex;
					flex-wrap: wrap;
					margin: 10rpx 0;
					.u-tag {
						margin-right: 10rpx;
					}
				}
				
			}
			
			.location {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 100%;
				text:first-child {
					color: #333;
				}
				text:nth-child(2) {
					margin-right: auto;
					margin-left: 10rpx;
				}
			}
	
			.subject {
				margin-top: 10rpx;
				border-top: 1rpx solid #ECECEC;
				.row {
					display: flex;
					align-items: center;
					justify-content: space-between;
					border-bottom: 1rpx dashed #e2e2e2;
					padding: 10rpx 0;
					.sub_title {
						width: 208rpx;
						color: $color-red;
						font-size: 32rpx;
						font-weight: 500;
						text-align: right;
					}
					.course {
						display: flex;
						align-items: center;
						margin-right: auto;
					}
					.ke {
						background-color: rgba($color: $color-red, $alpha: 0.2);
						color: $color-red;
						padding: 2rpx 4rpx;
						margin-right: 8px;
					}
				}
				.row:last-child {
					border: none;
				}
			}
		}
	}
	
	.order {
		border-radius: 16rpx;
		.img-wrap {
			height: 132rpx !important;
			border-radius: 7rpx;
			overflow: hidden;
			image {
				height: 100%;
			}
		}
	}
}
</style>
