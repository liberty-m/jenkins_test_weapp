<template>
	<view class="pd-20">
		<rich-text :nodes="content"></rich-text>
		<!-- <u-parse :html="content"></u-parse> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			agreementType: 0,
			content: ''
		};
	},
	onLoad({ agreementType }) {
		this.agreementType = agreementType;
		this.getAgreement();
	},
	methods: {
		getAgreement() {
			// （0：隐私协议，1：用户服务协议，2：用户服务协议，3：运营商服务协议，4：机构入驻协议，5：合伙人入驻协议）
			this.$http
				.post('stuh5/agreement/selectOne', { agreementType: this.agreementType })
				.then(res => {
					if (res.code == 200) {
						this.content = res.data.content;
					} else {
						this.$util.showToast(res.msg);
					}
				})
				.catch(err => {
					this.$util.showToast(err.msg);
				});
		}
	}
};
</script>

<style lang="scss" scoped></style>
