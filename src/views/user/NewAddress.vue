<template>
  <div class="new-address bg-gray">
    <div class="bg-white">
      <h3 class="title">欢迎来到NULS,我们一起让区块链世界变得更简单</h3>
    </div>
    <div class="tab bg-white w1200 mt_30">
      <div class="tips bg-gray w630">
        <p class="font14"><i></i>请设置密码用以导入账户、转账、参与共识等重要行为验证</p>
        <p class="font14"><i></i>请认真保存钱包密码，NULS钱包不存储密码，也无法帮您找回，请务必牢记</p>
      </div>

      <el-form :model="newAddressForm" status-icon :rules="newAddressRules" ref="newAddressForm" class="pass-form w630">
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="newAddressForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="newAddressForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="form-bnt">
          <el-button type="success" @click="submitForm('newAddressForm')">创建账户</el-button>
          <el-button type="text" @click="toUrl('importAddress')">导入账户</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script>
  import nuls from 'nuls-sdk-js'
  import {API_CHAIN_ID,API_PREFIX} from '@/config'
  import {getAddressInfoByAddress} from '@/api/requestData'

  export default {
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.newAddressForm.checkPass !== '') {
            this.$refs.newAddressForm.validateField('checkPass');
          }
          callback();
        }
      };
      let validateCheckPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.newAddressForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        newAddressForm: {
          pass: '',
          checkPass: '',
        },
        newAddressRules: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validateCheckPass, trigger: 'blur'}
          ]
        },
        newAddressInfo: {},//创建地址信息
      };
    },
    methods: {

      /**
       *  创建账户提交
       * @param formName
       **/
      async submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(API_CHAIN_ID);
            console.log(API_PREFIX);
            console.log(this.newAddressForm.pass);
            this.newAddressInfo = nuls.newAddress(API_CHAIN_ID, this.newAddressForm.pass,API_PREFIX);
            console.log(this.newAddressInfo);
            this.getAddressInfoByAddress(this.newAddressInfo.address);
          } else {
            return false;
          }
        });
      },

      //获取账户信息根据创建的地址
      async getAddressInfoByAddress(address) {
        let addressInfo = await getAddressInfoByAddress(address);
        let newAdressInfo = {...this.newAddressInfo, ...addressInfo.data};
        if (addressInfo.success) {
          localStorage.setItem('accountInfo', JSON.stringify(newAdressInfo));
          this.$router.push({
            name: 'backupsAddress'
          });
        } else {
          this.$message({message: "创建地址错误: " + addressInfo.data.error.message, type: 'error', duration: 2000});
        }
      },

      /**
       * 连接跳转
       * @param name
       */
      toUrl(name) {
        this.$router.push({
          name: name,
        })
      },
    }
  }
</script>

<style lang="less">
  @import "./../../assets/css/style";

  .new-address {
    .bg-white {
    }
    .tab {
      .tips {
        margin: 40px auto;
        padding: 20px 30px;
        p {
          line-height: 24px;
          i {
            width: 5px;
            height: 5px;
            display: block;
            float: left;
            margin: 9px 10px 0 0;
            border-radius: 5px;
            background: #000000;
          }
        }
      }
      .pass-form {

      }

    }
  }

</style>
