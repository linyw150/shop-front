<template>
  <div>
    <div v-show="showList">
      <div class="search-div">
        <Form class="ivu-form-inline">
          <FormItem>
            <Input id="brand"placeholder="输入品牌号"  style="margin-left: 10px;"/>
          </FormItem>
          <FormItem>
            <Button type="primary" icon="ios-search">搜索</Button>
          </FormItem>
        </Form>
      </div>
      <Table border ref="selection" :columns="columns" :data="brandData"></Table>
      <Page :total="pageTotal" :page-size="pageSize"
            show-total show-elevator class="paging"
            @on-change="handlePage"
            @on-page-size-change="handlePageSize"
            show-sizer></Page>
    </div>
    <div v-show="showDetailPage">
      <Card class="brand-card">
        <p slot="title">
          <Icon type="ios-film-outline" style="margin-right: 10px;"></Icon>详情
          <Button style="float: right" @click="hideBrandDetail">返回</Button>
        </p>
        <div>
          <Form :model="brandForm">
            <FormItem prop="user">
              <Input type="text" v-model="brandForm.name" placeholder="商品名">
              </Input>
            </FormItem>
          </Form>
          <p>图片:</p>
          <img :src="brandForm.pictureUrl" style="width: 300px;">
          <p>备注:<span>{{brandForm.desc}}</span></p>
        </div>
      </Card>
    </div>
    <div v-show="showEditPage">
      <Card class="brand-card">
        <p slot="title">
          <Icon type="ios-film-outline" style="margin-right: 10px;"></Icon>编辑
          <Button style="float: right" @click="hideEditDetail">返回</Button>
        </p>
        <div>
          <Form :model="brandForm" ref="brandForm" :rules="brandValidate">
            <FormItem label="商品名:" prop="name">
              <Input type="text" v-model="brandForm.name" placeholder="商品名"/>
            </FormItem>
            <FormItem>
              <Upload
                multiple=""
                ref="upload"
                :on-success="handleUploadSuccess"
                :before-upload="handleUpload"
                action="api/uploadImg"
                :show-upload-list=false>
                <img :src="brandForm.pictureUrl" style="width: 300px;">
              </Upload>
            </FormItem>
            <FormItem label="备注:">
              <span>{{brandForm.desc}}</span>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="save('brandForm')">提交</Button>
              <Button @click="reset" style="margin-left: 8px">重置</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>
  </div>

</template>

<script>
  import { getBrandList } from '@/api/index';
  import { editBrandDetail } from '@/api/index';
  import { getBrandDetail } from '@/api/index';
  import axios from 'axios';
  import { tipWarning } from '@/utils/common';
  import { tipSuccess } from '@/utils/common';
  export default {
  data () {
    return {
      brandData: [],
      query:{
        page:1,
        keyword:'',
      },
      showList:true,
      showDetailPage:false,
      showEditPage:false,
      pageTotal:10, //每页总数
      pageSize: 10,//每页条数
      pageNum: 1, //初始第几页
      brandForm:{
        id:'',
        name:'',
        pictureUrl:'',
		    desc:'',
      },
      brandValidate:{
          name:[
          {required:true,message:'商品号不能为空', trigger: 'blur'}
        ]
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
          title: '品牌名',
          key: 'name'
        },
        {
          title: '图片',
          key: 'pictureUrl',
          render: (h, params) => {
          console.log(params.row)
            return h('div', {
              attrs: {
                style: 'width: 100%;height: 100%;'
              },
            }, [
                h('img', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  attrs: {
                    src: params.row.pictureUrl, style: 'width: auto;height: auto;max-width: 100%;max-height: 100%;'
                  },
                  style: {},
                }),
              ]);
          }
        },
        {
          title: '价格',
          key: 'price'
        },
        {
          title: '备注',
          key: 'desc'
        },
        {
          title: '操作',
          key: 'operation',
          render: (h, params) => {
          console.log(params.row)
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    icon: 'information',
                  },
                  style: {},
                  on:{ click:()=>{
                      this.showBrandDetail(params.row)
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
                      this.editBrand(params.row)
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
        getBrandList(params).then(res=>{
          let data = res.result;
          this.brandData = data.data;
          this.pageTotal = data.total;
      })
      },
      editBrand(data){
        var params = {}
        params.id = data.id
        this.showList = false;
        getBrandDetail(params).then(res=>{
          let data = res.result;
        this.showEditPage = true;
        this.brandForm.id=data.id;
        this.brandForm.pictureUrl=data.pictureUrl;
        this.brandForm.desc=data.desc;
        this.brandForm.name=data.name;
      })
      },
      showBrandDetail(data){
        var params = {}
        params.id = data.id
        this.showList = false;
        this.showList = false;
        getBrandDetail(params).then(res=>{
          let data = res.result;
          this.showDetailPage = true;
          this.brandForm.id=data.id;
          this.brandForm.pictureUrl=data.pictureUrl;
          this.brandForm.desc=data.desc;
          this.brandForm.name=data.name;
      })

      },
      hideBrandDetail(){
        this.showList = !this.showList;
        this.showDetailPage = false;
      },
      hideEditDetail(){
        this.showList = !this.showList;
        this.showEditPage = false;
        this.$refs['brandForm'].resetFields();

      },
      reset(){
        this.$refs['brandForm'].resetFields();
      },
      handlePage(value){
        this.pageNum = value
        this.initData();
      },

      handlePageSize(value){
        this.pageSize = value;
        this.initData();
      },
      save(name){
        var _this = this
        console.log(name)
        _this.$refs[name].validate(function(valid){
         if(valid){
           var postData =_this.brandInfo
           editBrandDetail(postData).then(res => {
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
        this.brandInfo.pictureUrl = res.result;
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
  @import './brand.less';
</style>
