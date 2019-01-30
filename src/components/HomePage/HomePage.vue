<template>

           <Layout>
                   <Menu mode="horizontal" theme="dark" active-name="1">
                       <div class="layout-logo"><img src="./img/logo1.png" alt=""></div>
                   </Menu>
               <Content :style="{padding: '100px 50px'}" style="height:auto">
                       <div style="min-height: 10px">
                           <Row type="flex" justify="space-between">
                                <Col span="7">
                                    <router-link to="ActiveOperationPage" class="my-card">
                                    <Card style="height:300px;textAlign:center;backgroundColor:#FAFBFC">
                                        <br/>
                                        <br/>
                                        <br/>
                                        <Icon type="ios-construct" size="100" class="my-icon" style="color:#FF6D4A" /><br>
                                        <span style="fontSize:18px;color:#000">主动运维服务</span>
                                        <br/>
                                        <br/>
                                        <p>为您的微网资产提供能源管理，运维以及调度优化服务</p>
                                    </Card>
                                    </router-link>
                                </Col>
                                <Col span="7">
                                    <router-link to="" class="my-card">
                                     <Card style="height:300px;textAlign:center;backgroundColor:#FAFBFC">
                                        <br/>
                                        <br/>
                                        <br/>
                                       <Icon type="md-calculator" size="100" class="my-icon" style="color:#FF6D4A"/><br>
                                       <span style="fontSize:18px;color:#000">价格估算器</span>
                                       <br/>
                                       <br/>
                                       <p>根据您的资产组合，估算可获得的资产回报率</p>
                                    </Card>
                                    </router-link>
                                </Col>
                                <Col span="7">
                                    <router-link to="" class="my-card">
                                    <Card style="height:300px;textAlign:center;backgroundColor:#FAFBFC">
                                        <br/>
                                        <br/>
                                        <br/>
                                       <Icon type="md-list-box" size="100" class="my-icon" style="color:#FF6D4A"/><br>
                                       <span style="fontSize:18px;color:#000">合同管理系统</span>
                                       <br/>
                                       <br/>
                                       <p>查看和管理您的资产交易合同</p>
                                    </Card>
                                    </router-link>
                                </Col>
                           </Row>
                           <!-- <hr style="backgroundColor:#eee;marginBottom: 30px;marginTop:30px;border:none;height:1px"/> -->
                       </div>

               </Content>
               <!-- <Footer class="layout-footer-center">2011-2018 &copy; Power X</Footer> -->
           </Layout>

</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
.ivu-card-bordered
    border none
.ivu-layout-content
        background-color: #fff;
.ivu-menu-horizontal
    box-shadow 4px 4px 4px #eee
.ivu-layout-header,
.ivu-menu
    background #fff
.layout
    // border 1px solid #d7dde4
    background #fff
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
    // img
        // background #fff
        // width 100px
      //  height 30px

.layout-footer-center
    text-align center
.my-card
    color #515A6E
.my-card:hover .my-icon
    color #fff
    box-shadow none
// .my-card:hover .ivu-card
//     border 1px solid #CEF17A
//     box-shadow none

</style>

