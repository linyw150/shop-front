<template>
  <div>
    <div v-show="showList">
      <div class="search-div">
        <div>
          <Form class="ivu-form-inline">
            <FormItem>
              <Input id="manager"placeholder="输入店长" v-model="keyword" style="margin-left: 10px;" />
            </FormItem>
            <FormItem>
              <Button type="primary" icon="ios-search" click="search">搜索</Button>
            </FormItem>
            <FormItem>
              <Button type="primary" >重置</Button>
            </FormItem>
            <FormItem>
              <Button type="primary"  @click="add" >新增</Button>
            </FormItem>
            <FormItem>
              <Poptip
                confirm
                title="您确认暂停使用？"
                @on-ok="pause">
                <Button type="warning"  icon="pause">暂停使用</Button>
              </Poptip>
            </FormItem>
          </Form>
        </div>
      </div>
      <Table border ref="selection" :columns="columns" :data="managerData" @on-select="select"></Table>
      <Page :total="pageTotal" :page-size="pageSize"
            show-total show-elevator class="paging"
            @on-change="handlePage"
            @on-page-size-change="handlePageSize"
            show-sizer></Page>
    </div>
    <div v-show="editManagerPage">
      <Card class="manager-card">
        <p slot="title">
          <Icon type="ios-film-outline" style="margin-right: 10px;"></Icon>新增/编辑
          <Button style="float: right" @click="hideManagerPage">返回</Button>
        </p>
        <div>
          <Form :model="managerForm" ref="managerForm":rules="managerValidate" :label-width="130"><!--label的长度为130，可以对齐内容-->
            <Row>
              <i-col span="9">
                <FormItem label="店长" prop="name">
                  <Input type="text" v-model="managerForm.name" placeholder="店长名称">
                  </Input>
                </FormItem>
              </i-col>
            </Row>
            <Row>
              <i-col span="9">
                <FormItem label="手机号" prop="mobile">
                  <Input type="text" v-model="managerForm.mobile" placeholder="手机号码">
                  </Input>
                </FormItem>
              </i-col>
            </Row>
            <Row>
              <i-col span="9">
                <FormItem label="状态" prop="state">
                  <Radio-group v-model="managerForm.state" :label="managerForm.state">
                    <Radio :label="1">使用中</Radio>
                    <Radio :label="2">暂停使用</Radio>
                  </Radio-group>
                </FormItem>
              </i-col>
            </Row>

                <FormItem prop="headpath" label="头像:" >
                    <Upload
                      multiple=""
                      ref="upload"
                      action="api/uploadImg"
                      :show-upload-list=false
                      :on-success="handleUploadSuccess"
                    >
                      <div style="width: 100px;height: 100px;position: relative;border: 1px solid #f0f0f0" >
                            <div v-if="managerForm.headpath">
                              <img :src="managerForm.headpath" class="image">
                            </div>
                      </div>
                    </Upload>
<!--                    <div style="text-align: center">
                      <Button icon="ios-eye-outline" size="small">查看大图</Button>
                    </div>-->
                </FormItem>

            <FormItem>
              <Button type="primary" @click="save('managerForm')">提交</Button>
              <Button @click="reset" style="margin-left: 8px">重置</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>
  </div>

</template>

<script>
  import { getManagerList } from '@/api/index';
  import { saveManager } from '@/api/index';
  import { getManager } from '@/api/index';
  import { stopManager } from '@/api/index';
  import { searchManager } from '@/api/index';
  import axios from 'axios';
  import { tipWarning } from '@/utils/common';
  import { tipSuccess } from '@/utils/common';
  export default {
  data () {
    return {
      managerData: [],
      query:{
        page:1,
        keyword:'',
      },
      showList:true,
      editManagerPage:false,
      pageTotal:10, //每页总数
      pageSize: 10,//每页条数
      pageNum: 1, //初始第几页
      managerForm:{
        id:'',
        name:'',
        mobile:'',
        headpath:'',
        state:1,
      },
      selectIds:[],
      managerValidate:{
          name:[
          {required:true,message:'姓名不能为空', trigger: 'blur'}
        ],
        mobile: [
          { required: true, message: '手机号不能为空',trigger: 'blur'}
        ],
        state: [
          { required: true,trigger: 'change',type:'number'}
        ],
      },
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '店长名',
          key: 'name'
        },
        {
          title: '状态',
          key: 'state',
          render:(h,params)=>{
            if(params.row.state=='1'){
                  return h('div', [
                    h('Button', {
                      props: {
                        type: 'success',
                      },
                      style: {'margin-right':'10px'}
                },'使用中')
                ]);
            }else{
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'warning',
                    },
                    style: {'margin-right':'10px'}
                  },'暂停使用')
                ]);
            }
          }
        },
        {
          title: '头像',
          key: 'headpath',
          render: (h, params) => {
          return h('div', [
            h('img', {
              attrs: {
                src: params.row.headPath
              },
              style: {
                width: '40px',
                height: '40px'
              }
            }),
          ]);
          }
        },
        {
          title: '操作',
          key: 'operation',
          render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    icon: 'edit',
                  },
                  style: {'margin-right':'10px'},
                  on:{ click:()=>{
                      this.edit(params.row)
                    }
                  }
                },'编辑')
              ]);
            }
        }
      ],
    }
  },
    methods:{
      initData(){
        var params = {}
        params.pageNum = this.pageNum;
        params.pageSize = this.pageSize;
        this.showList = true
        getManagerList(params).then(res=>{
          let data = res.result;
          let managerList = [];
          this.managerData = data.data
          this.pageTotal = data.total;
      })
      },
      add(){
        this.showList = false;
        this.editManagerPage = true;
        this.managerForm.id="";
        this.managerForm.name="";
        this.managerForm.headpath = "";
        this.managerForm.mobile = "";
        this.managerForm.state = 1;
      },
      edit(data){
        this.showList = false;
        this.editManagerPage = true;
        var params = {};
        params.id = data.id
        getManager(params).then(res=>{
          let data = res.result;
          this.managerForm.id=data.id;
          this.managerForm.name=data.name;
          this.managerForm.mobile=data.mobile;
          this.managerForm.headpath = data.headPath;
          this.managerForm.state = data.state;
      })
      },
      save(name){
        var _this = this;
        _this.$refs[name].validate(function(valid){
          if(valid){
            var postData =_this.managerForm;
            postData.areaCode = 86;
            saveManager(postData).then(res => {
              if(res.errorCode==0){
                _this.editManagerPage = false;
                _this.initData();
            }else{
                tipWarning(_this,'操作失敗',res.errMsg)//提示后台返回
            }
          });
          }
        })
      },
      select(data){
        this.selectIds = [];
        for(var i in data){
          this.selectIds.push(data[i].id)
        }
      },
      search(){
        var params = {};
        params.keyword = params.
        searchManager(params).then(res=>{
          let data = res.result;
          this.managerForm.id=data.id;
          this.managerForm.name=data.name;
          this.managerForm.mobile=data.mobile;
          this.managerForm.headpath = data.headPath;
          this.managerForm.state = data.state;
        })
      },
      pause(){
        var _this = this;
         var ids = _this.selectIds.join(',');
         var postData = {};
         postData.ids = ids;
         stopManager(postData).then(res => {
          if(res.errorCode==0){
            _this.initData();
        }else{
          tipWarning(_this,'操作失敗',res.errMsg)//提示后台返回
        }
      });

      },
      hideManagerPage(){
        this.showList = true;
        this.editManagerPage = false;
      },
      hideEditDetail(){
        this.showList = !this.showList;
        this.showEditPage = false;
        this.$refs['managerForm'].resetFields();

      },
      reset(){
        this.$refs['managerForm'].resetFields();
      },
      handlePage(value){
        this.pageNum = value
        this.initData();
      },
      handlePageSize(value){
        this.pageSize = value;
        this.initData();
      },
      handleUploadSuccess(res,file){
        this.managerForm.headpath = res.result;
      }

    },
    mounted(){
      this.initData();
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import './manager.less';
</style>
