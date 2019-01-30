<template>
  <Content v-if="this.$store.state.isShow" :style="{padding: '30px 30px',backgroundColor: '#ffffff'}">
    <div class="loadingPage"  style="padding-top: 150px;padding-left: 10px;background-color: #ffffff;height: 100%">
    <!--<Modal v-model="this.$store.state.isShow"  scrollable :footer-hide=true style="background-color: #ffffff;">-->
        <Col class="demo-spin-col">
            <Spin fix>
              <Icon type="ios-loading" size=100 class="demo-spin-icon-load"></Icon>
              <div style="font-style: inherit;">Loading......</div>
            </Spin>
        </Col>
    <!--</Modal>-->
  </div>
  </Content>

</template>

<script>

    export default {
        name: 'LoadingPage',

    }
</script>

<style lang="stylus">
.demo-spin-icon-load
   animation: ani-demo-spin 2s linear infinite

.demo-spin-col
  padding-right: 200px !important
  padding-left: 200px !important
  padding-top: 200px !important
  padding-bottom: 200px !important
  border: 0px solid #ffffff !important
  background-color: #ffffff !important

</style>
