<template>
  <div class="contactus">
    <div class="layout">
      <Layout>
        <Header>
          <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo"><img src="../img/logo.png" alt=""></div>
          </Menu>
        </Header>
        <Content :style="{padding: '0 50px'}">
          <Breadcrumb :style="{margin: '20px 0'}">
            <BreadcrumbItem to="/" style="fontSize:18px">
              <Icon type="ios-home-outline" size="20"></Icon>
              Home
            </BreadcrumbItem>
          </Breadcrumb>
          <Card style="marginBottom: 36px">
            <div style="min-height: 750px;text-align: center" :customer="customer" :provider="provider" :email="email"
                 :phoneNumber="phoneNumber" :weChat="weChat">
              <div style="height: 90px">
                <p class="ivu-steps-title" style="text-align: left;">
                  尊敬的【{{customer}}】，我们已经收到您的信息，【{{provider}}】是您的客户经理。</p>
                <p class="ivu-steps-title" style="text-align: left">他在努力的整理您的资料，然后给您最专业的服务。同时您可以随时联系【{{provider}}】。</p>
                <p class="ivu-steps-title" style="text-align: left">【{{provider}}】的联络方式如下:</p>
              </div>

              <div style="float: left;width: 10%;height: 180px">
                <img style="width: 120px;height: 160px" src="../img/3.jpg">
              </div>
              <div style="float: left;padding: 100px 100px;width: 90%;height: 180px">
                <p class="ivu-steps-title" style="text-align: left;margin-left: -100px;margin-top: -105px">电话：【{{phoneNumber}}】</p>
                <p class="ivu-steps-title" style="text-align: left;margin-left: -100px;margin-top: 20px">
                  邮箱：【{{email}}】</p>
                <p class="ivu-steps-title" style="text-align: left;margin-left: -100px;margin-top: 20px">
                  微信：【{{weChat}}】</p>
              </div>
              <div style="float: none">
                <p class="ivu-steps-title" style="text-align: left">【公司口号】</p>
              </div>

            </div>
          </Card>
        </Content>
        <Footer class="layout-footer-center">2011-2018 &copy; Power X</Footer>
      </Layout>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ContactUs',
    data() {
      return {
        customer: '客户',
        provider: '贾楠',
        email: 'open_api@powerx.io',
        phoneNumber: '18888888',
        weChat: '0000001'

      }
    }
  }
</script>

<style lang="stylus" scoped>
.ivu-layout-header,
.ivu-menu
  background #22262f
.layout
  border 1px solid #d7dde4
  // background #51e39a
  position relative
  border-radius 4px
  overflow hidden


.layout-logo
  width 100px
  height 40px
  // background #fff
  border-radius 3px
  float left
  position relative
  top 12px
  left 20px
  img
    // background #fff
    width 100px
    height 30px

.layout-footer-center
  text-align center

</style>
