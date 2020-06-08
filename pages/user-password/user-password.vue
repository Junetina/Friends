<template>
	<view>
		<input class="uni-input py-2 border-bottom" type="text" 
				placeholder="输入旧密码" v-model="oldpassword"/>
				
		<input class="uni-input py-2 border-bottom my-2" type="text" 
				placeholder="输入新密码" v-model="newpassword" />
		<input class="uni-input py-2 border-bottom" type="text" 
		placeholder="输入确认密码" v-model="renewpassword" />
				
		<view class="py-2 px-3 my-4">
			<button class="bg-main text-white" :disabled="disabled"
							style="border-radius: 50rpx;border: 0;"
							@click="submit"
						:class='disabled?"bg-main-disabled":""'>确认</button>
		</view>
	</view>
</template>

<script>
	
	export default {
		data(){
			return {
				oldpassword:'',
				newpassword:'',
				renewpassword:''
			}
		},
		computed:{
			disabled(){
				return this.oldpassword==='' || this.newpassword==='' || this.renewpassword===''
			}
		},
		methods:{
			//验证
			check(){
				console.log('buyiyang')
				if(this.newpassword!==this.renewpassword){
					uni.showToast({
						icon:'none',
						title: '两次密码不一样'
					})
					return false
				}
				return true
			},
			//提交 
			submit(){
				console.log(1)
				if(!this.check()) return 
				console.log('提交成功')
			}
		}
	}
</script>

<style>
</style>
