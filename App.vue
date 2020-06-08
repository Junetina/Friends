<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/uni.css';
	/*引入字体图标css */
	@import './common/icon.css';
	/*引入动画库css */
	@import './common/animate.css';
	/* 引入通用项目全局样式 */
	@import './common/free.css';
	/* 引入本项目公共样式 */
	@import './common/common.css';
</style>
