<template>
	<view>
		<!-- 自定义导航 -->
<!-- 		<uni-nav-bar left-icon="back" statusBar  title="" border='false' @click-left='goBack'>

		</uni-nav-bar> -->
		
		<uni-nav-bar left-icon="back" statusBar left-text="返回"  title="" @clickLeft='goBack'>
			<view class='w-100 flex justify-center align-center'>
				所有人可见<text class='iconfont icon-shezhi'></text>
			</view>
		</uni-nav-bar>
		<!-- 文本域 -->
		<textarea v-model="content"
							class='uni-textarea px-2 py-2'
							placeholder="说一句话吧" />
							
		<!-- 上传多图功能 -->
			<!-- :show='show' 利用计算属性 确定imagelist里面是否有值，如果有值就显示出图片缩略图区域，如果没有值，就不展示那块区域。把布尔值传给						子组件，子组件通过v-if来控制是否隐藏 -->
		<view>
			<upload-image  ref='uploadImage'
										:show='show'
										@changeImage='changeImage' 
										:imglist='imageList'>
			</upload-image>
		</view>
		
		<!-- 底部导航组件 -->
		<view class='fixed-bottom flex align-center px-3 pb-2'
					style="100rpx">
			<view class='iconfont icon-caidan foot-btn animated'  
						hover-class='jello'></view>
			<view class='iconfont icon-huati foot-btn animated'  
						hover-class='jello'></view>
			<view class='iconfont icon-tupian foot-btn animated'
						@tap='iconClickEvent("imageIcon")'
						hover-class='jello'></view>
			<view class='bg-main text-white flex align-center justify-center ml-auto rounded animated'
						hover-class='jello'
						style='width:160rpx;height:76rpx;'>发送</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue'
	import uploadImage from '@/components/common/upload-image.vue'
	export default {
		components:{
			uniNavBar,
			uploadImage
		},
		data(){
			return {
				content:'',
				imageList:[],
				//是否已经弹出过保存与否的弹窗了
				isSave:false
			}
		},
		computed:{
			show(){
				return this.imageList.length>0
			}
		},
		//页面加载时
		onLoad() {
			uni.getStorage({
				key:'add-input',
				success:(res)=>{
					// console.log(res)
					if(res.data){
						let obj =JSON.parse(res.data)
						this.content=obj.content
						this.imageList=obj.imageList
					}

				}
			})
		},
		//监听返回时
		onBackPress(){
			if((this.content!==''||this.imageList.length>0) && !this.isSave){
				uni.showModal({
					content: '是否保存为草稿吗？',
					showCancel: true,
					cancelText: '不保存',
					confirmText: '保存',
					success: res => {
						if(res.confirm){
							this.store()
					}else{
						uni.removeStorage({
							key:'add-input'
						})
					}
					//手动执行返回
					uni.navigateBack({
						delta: 1
					})
					}//END SUCCESS
				})//END SHOWMODAL
				this.isSave=true
				return true
			}
		},
		methods:{
			//保存到本地
			store(){
				uni.setStorage({
					key:'add-input',
					data:JSON.stringify({
						content:this.content,
						imageList:this.imageList
					})
				})
			},
			//返回上一页
			goBack(){
				// console.log(1)
				uni.navigateBack({
					delta: 1
				});
			},	
			//选择好图片：由子组件通知过来的函数，并接收选择成功后的图片数组
			changeImage(e){
				// console.log(e)
				this.imageList=e
			},
			//点击底部选择图片按钮
			iconClickEvent(e){
				switch (e){
					case 'imageIcon':
					//如果此时图标类型是‘图片按钮’,就让子组件uploadImage调用chooseImage()方法
						this.$refs.uploadImage.chooseImage()
						break;
				}
			}
		}
	}
</script>

<style>
	.foot-btn{
		width: 86rpx;
		height:86rpx;
		justify-content: center;
		align-items: center;
		font-size:60rpx;
		padding-right:20rpx ;
	}
</style>
