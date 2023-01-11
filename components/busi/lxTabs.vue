<template>
	<view>
		<view class="lx-tabs" :class="classObject">
			<view v-for="(tab, index) in tabs" class="mr-40 item" :key="index" @tap="handleTabClick(tab, index)">
				<view :class="currentIndex === index && 'active'">{{tab.name}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			showType: {
				type: String,
				default: 'normal' // normal big small underline 
			},
			tabs: {
				type: Array,
				default: () => []
			},
			current: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				currentIndex: this.current
			};
		},
		watch:  {
			current (index) {
				this.currentIndex = index
			}
		},
		computed: {
			classObject() {
				if (this.showType === 'normal') {
					return 'normal'
				}
				if (this.showType === 'big') {
					return 'big'
				}
				if (this.showType === 'small') {
					return 'small'
				}
				if (this.showType === 'underline') {
					return 'underline'
				}
				// 小程序不支持下面写法
				// return {
				// 	normal: this.showType === 'normal',
				// 	big: this.showType === 'big',
				// 	small: this.showType === 'small',
				// 	underline: this.showType === 'underline'
				// }
			}
		},
		methods: {
			handleTabClick(item, index) {
				console.log('tab click: ', item)
				this.currentIndex = index
				this.$emit('tab-click', item, index)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.lx-tabs {
		display: flex;
		align-items: center;
		font-size: 32rpx;
		&.normal {
			.active {
				color: $color-red;
				font-weight: bold;
			}
		}
		
		&.small {
			font-size: 30rpx;
			color: #999;
			.item:not(:last-child) {
				margin-right: 46rpx !important;
			}
			.active {
				color: $color-red;
				font-weight: bold;
				position: relative;
				&::after {
					content: '';
					position: absolute;
					left: 0rpx;
					bottom: 0rpx;
					width: 100%;
					height: 8rpx;
					border-radius: 10rpx;
					background: linear-gradient(180deg, #FFFFFF 0%, #F7E2E2 47%, #F9D3D3 100%);
				}
			}
		}
		
	}
	.lx-tabs.big .active {
		color: $color-red;
		font-size: 40rpx;
		font-weight: bold;
	}
</style>
