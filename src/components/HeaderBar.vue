<template>
  <div class="header bg-white">
    <div class="w1200">
      <div class="logo fl">
        <img class="clicks" @click="toUrl('home')" src="../assets/logo.png">
      </div>
      <div class="nav fl">
        <el-menu :default-active="activeIndex" class="fl" mode="horizontal" @select="handleSelect">
          <el-menu-item index="vote">票权</el-menu-item>
          <el-menu-item index="council">理事会</el-menu-item>
          <el-menu-item index="proposal">提案</el-menu-item>
          <div class="user click fr tc">
            <div v-if="!accountAddress">
              <el-link type="primary" @click="toUrl('newAddress')" v-if="!accountAddress">
                登陆
              </el-link>
            </div>
            <div class="user_info" v-else>
              <div>可用票数: 987654</div>
              <el-submenu index="user">
                <template slot="title"><i class="el-icon-more click"></i></template>
                <el-menu-item index="userInfo">用户中心</el-menu-item>
                <el-menu-item index="signOut">退出</el-menu-item>
              </el-submenu>
            </div>
          </div>
        </el-menu>
      </div>
    </div>
    <div class="cb"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',//导航选中
        accountInfo: {},//账户信息
        accountAddress: '',
      };
    },
    created() {
      setInterval(() => {
        if (localStorage.hasOwnProperty('accountInfo')) {
          this.accountInfo = JSON.parse(localStorage.getItem('accountInfo'));
          this.accountAddress = this.accountInfo.address;
        }
      }, 500);
    },

    methods: {

      /**
       * 导航切换
       * @param key
       * @param keyPath
       */
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        if (key === 'vote') {

        } else if (key === 'council') {

        } else if (key === 'proposal') {

        } else if (key === 'signOut') {
          this.signOut();
        }
      },

      /**
       * 退出
       */
      signOut() {
        localStorage.removeItem('accountInfo');
        this.accountInfo = {};
        this.accountAddress = '';
      },

      /**
       * url 连接
       * @param name
       */
      toUrl(name) {
        this.$router.push({
          name: name,
        })
      }
    }
  }
</script>

<style lang="less">
  @import "./../assets/css/style";

  .header {
    border-bottom: @BD1;
    height: 80px;
    line-height: 80px;
    .logo {
      width: 150px;
      margin: 18px 0 0 0;
      height: 62px;
    }
    .nav {
      width: 1050px;
      height: 79px;
      .el-menu.el-menu--horizontal {
        border-bottom: 0;
        width: 950px;
        height: 79px;
        .el-menu-item {
          height: 79px;
          line-height: 80px;
          font-size: 16px;
          &:hover {
            color: @Ncolour;
          }
        }
        .is-active {
          color: @Ncolour;
          border-bottom: 0 solid transparent;
        }
      }
      .user {
        width: 100px;
        line-height: 80px;
        .user_info {
          .el-submenu {
            &:hover {
              background-color: transparent;
            }
            .el-submenu__title {
              line-height: 20px;
              height: 20px;
              margin: 25px auto 0;
              padding: 0;
              width: 25px;
              .el-icon-arrow-down {
                font-size: 0;
              }
            }
          }
        }
      }
    }
  }
</style>
