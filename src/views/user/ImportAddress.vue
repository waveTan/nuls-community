<template>
  <div class="import-address bg-gray">
    <div class="bg-white">
      <BackBar backTitle="创建地址"></BackBar>
      <h3 class="title tc mt_f_20">导入账户</h3>
    </div>
    <div class="tab bg-white w1200 mt_30">
      <el-form :model="importForm" :rules="importRules" ref="importForm" status-icon class="import-form w630">
        <el-form-item label="明文私钥" prop="keys">
          <el-input type="textarea" v-model.trim="importForm.keys" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input v-model="importForm.pass" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="importForm.checkPass" type="password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item class="form-bnt">
          <el-button type="success" @click="submitForm('importForm')">创建账户</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import nuls from 'nuls-sdk-js'
  import {API_CHAIN_ID} from '@/config'
  import {getAddressInfoByAddress} from '@/api/requestData'
  import BackBar from '@/components/BackBar'

  export default {
    name: "import-address",
    data() {
      let validateKeys = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入私钥'));
        } else {
          callback();
        }
      };
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.importForm.checkPass !== '') {
            this.$refs.importForm.validateField('checkPass');
          }
          callback();
        }
      };
      let validateCheckPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.importForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        importForm: {
          keys: '',
          pass: '',
          checkPass: ''
        },
        importRules: {
          keys:
            [
              {validator: validateKeys, trigger: 'blur'}
            ],
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validateCheckPass, trigger: 'blur'}
          ]
        },
        importAddressInfo: {},
      };
    },
    components: {
      BackBar
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.importAddressInfo = nuls.importByKey(API_CHAIN_ID, this.importForm.keys, this.importForm.pass);
            this.getAddressInfoByAddress(this.importAddressInfo.address);
          } else {
            return false;
          }
        });
      },
      //获取账户信息根据创建的地址
      async getAddressInfoByAddress(address) {
        let addressInfo = await getAddressInfoByAddress(address);
        let newAdressInfo = {...this.importAddressInfo, ...addressInfo.data};
        if (addressInfo.success) {
          localStorage.setItem('accountInfo', JSON.stringify(newAdressInfo));
          this.$router.push({
            name: 'backupsAddress'
          });
        } else {
          this.$message({message: "导入地址错误: " + addressInfo.data.error.message, type: 'error', duration: 2000});
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
  .import-address {
    .import-form {
      margin: 60px auto 0;
    }
  }

</style>
