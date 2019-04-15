<template>
  <div>
    <div v-show="showList">
      <div class="search-div">
        <div>
          <Form class="ivu-form-inline">
            <FormItem>
              <Input id="manager"placeholder="输入店长" style="margin-left: 10px;" />
            </FormItem>
            <FormItem>
              <Button type="primary" icon="ios-search">搜索</Button>
            </FormItem>
            <FormItem>
              <Button type="primary"  @click="addManager">新增</Button>
            </FormItem>
          </Form>
        </div>
      </div>
      <Table border ref="selection" :columns="columns" :data="managerData"></Table>
      <Page :total="pageTotal" :page-size="pageSize"
            show-total show-elevator class="paging"
            @on-change="handlePage"
            @on-page-size-change="handlePageSize"
            show-sizer></Page>
    </div>
    <div v-show="showDetailPage">
      <Card class="manager-card">
        <p slot="title">
          <Icon type="ios-film-outline" style="margin-right: 10px;"></Icon>详情
          <Button style="float: right" @click="hideManagerDetail">返回</Button>
        </p>
        <div>
          <Form :model="managerForm">
            <FormItem prop="user">
              <Input type="text" v-model="managerForm.name" placeholder="店长名称">
              </Input>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>
    <div v-show="addManagerPage">
      <Card class="manager-card">
        <p slot="title">
          <Icon type="ios-film-outline" style="margin-right: 10px;"></Icon>详情
          <Button style="float: right" @click="hideManagerDetail">返回</Button>
        </p>
        <div>
          <Form :model="managerForm" :rules="managerValidate">
            <FormItem label="店长" prop="name">
              <Input type="text" v-model="managerForm.name" placeholder="店长名称">
              </Input>
            </FormItem>
            <FormItem prop="mobile"label="手机号">
              <Input type="text" v-model="managerForm.name" placeholder="手机号码">
              </Input>
            </FormItem>
            <FormItem prop="headpath" label="头像:">
              <Upload
                multiple=""
                ref="upload"
                :on-success="handleUploadSuccess"
                :before-upload="handleUpload"
                action="api/uploadImg"
                :show-upload-list=false>
                <img :src="managerForm.headpath" style="width: 300px;">
              </Upload>
              </Input>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>
    <div v-show="showEditPage">
      <Card class="manager-card">
        <p slot="title">
          <Icon type="ios-film-outline" style="margin-right: 10px;"></Icon>编辑
          <Button style="float: right" @click="hideEditDetail">返回</Button>
        </p>
        <div>
          <Form :model="managerForm" ref="managerForm" :rules="managerValidate">
            <FormItem label="商品名:" prop="name">
              <Input type="text" v-model="managerForm.name" placeholder="商品名"/>
            </FormItem>

            <FormItem>
              <Button type="primary" @click="save">提交</Button>
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
  import { getManagerDetail } from '@/api/index';
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
      showDetailPage:false,
      showEditPage:false,
      addManagerPage:false,
      pageTotal:10, //每页总数
      pageSize: 10,//每页条数
      pageNum: 1, //初始第几页
      managerForm:{
        id:'',
        name:'',
      },
      managerValidate:{
          name:[
          {required:true,message:'商品号不能为空'}
        ],
        mobile: [
          { required: true, message: 'Please select gender', trigger: 'change' }
        ],
      },
      file:[],
      uploadFile:[],
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
          title: '头像',
          key: 'headpath'
        },
        {
          title: '操作',
          key: 'operation',
          render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    icon: 'information',
                  },
                  style: {},
                  on:{ click:()=>{
                      this.showManagerDetail(params.row)
                    }

                  }
                },'详情'),
                  h('Button', {
                    props: {
                      type: 'info',
                      icon: 'edit',
                    },
                    style: {},
                    on:{ click:()=>{
                      this.editManager(params.row)
                  }
                }
                },'编辑'),
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
        getManagerList(params).then(res=>{
          let data = res.result;
          this.managerData = data.data;
          this.pageTotal = data.total;
      })
      },
      editManager(data){
        var params = {}
        params.id = data.id
        this.showList = false;
        getManagerDetail(params).then(res=>{
          let data = res.result;
        this.showEditPage = true;
        this.managerForm.id=data.id;
        this.managerForm.name=data.name;
        this.managerForm.headpath = data.headpath;
      })
      },
      showManagerDetail(data){
        var params = {}
        params.id = data.id
        this.showList = false;
        this.showList = false;
        getManagerDetail(params).then(res=>{
          let data = res.result;
          this.showDetailPage = true;
          this.managerForm.id=data.id;
          this.managerForm.name=data.name;
      })

      },
      hideManagerDetail(){
        this.showList = !this.showList;
        this.showDetailPage = false;
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
      addManager(){
        this.showList = false;
        this.addManagerPage = true;
      },
      save(name){
        var _this = this
        _this.$refs[name].validate(function(valid){
         if(valid){
           var postData =_this.ManagerInfo
           editManagerDetail(postData).then(res => {
             if(res.errorCode==0){
              _this.hideEditDetail();
              _this.initData();
             }else{
             tipWarning(_this,'操作失敗',res.errMsg)//提示后台返回
           }
         });
         }
      })
      },
      handleUploadSuccess(res,file){
        console.log(res)
        this.ManagerInfo.pictureUrl = res.result;
      },
      handleUpload (file) {
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
