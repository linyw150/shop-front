<template>
  <div>
    <div v-show="showList">
      <div class="search-div">
        <Form class="ivu-form-inline">
          <FormItem>
            <Input id="brand"placeholder="输入品牌号" style="width: 150px;" />
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
          <Form :model="brandInfo">
            <FormItem prop="user">
              <Input type="text" v-model="brandInfo.name" placeholder="商品名">
              </Input>
            </FormItem>
          </Form>
          <p>图片:</p>
          <img :src="brandInfo.pictureUrl" style="width: 300px;">
          <p>备注:<span>{{brandInfo.desc}}</span></p>
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
          <Form :model="brandInfo" ref="brandInfo" :rules="brandValidate">
            <FormItem label="商品名:" prop="name">
              <Input type="text" v-model="brandInfo.name" placeholder="商品名"/>
            </FormItem>
            <FormItem>
              <Upload
                multiple=""
                ref="upload"
                :on-success="handleUploadSuccess"
                :before-upload="handleUpload"
                action="api/uploadImg">
                <img :src="brandInfo.pictureUrl" style="width: 300px;">
              </Upload>
            </FormItem>
            <FormItem label="备注:">
              <span>{{brandInfo.desc}}</span>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('brandInfo')">提交</Button>
              <Button @click="handleReset" style="margin-left: 8px">重置</Button>
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
  import axios from 'axios';
  import { tipWarning } from '@/utils/common';
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
      brandInfo:{
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
/*        axios.post(getBrandList,params).then(res => {
          console.log(typeof(res.result))
          let data = res.result;
          console.log(data);
          this.brandData = data;
         });*/
        getBrandList(params).then(res=>{
          let data = res.result;
          this.brandData = data.data;
          this.pageTotal = data.total;
      })
      },
      editBrand(data){
        this.showList = false;
        this.showEditPage = true;
        this.brandInfo.id=data.id;
        this.brandInfo.pictureUrl=data.pictureUrl;
        this.brandInfo.desc=data.desc;
        this.brandInfo.name=data.name;
      },
      showBrandDetail(data){
        this.showList = false;
        this.showDetailPage = true;
        this.brandInfo.id=data.id;
        this.brandInfo.pictureUrl=data.pictureUrl;
        this.brandInfo.desc=data.desc;
        this.brandInfo.name=data.name;
      },
      hideBrandDetail(){
        this.showList = !this.showList;
        this.showDetailPage = false;
      },
      hideEditDetail(){
        this.showList = !this.showList;
        this.showEditPage = false;

      },
      handlePage(value){
        this.pageNum = value
        this.initData();

      },
      handlePageSize(value){
        this.pageSize = value;
        this.initData();
      },
      handleSubmit(name){
      console.log(this.brandInfo.name)
      var that = this
      that.$refs[name].validate(function(valid){
         if(valid){
           tipSuccess(that,'提交成功','bbb')
         }else{
           tipWarning(that,'操作失敗','bbb')//提示后台返回
         }
      })
  /*      editBrandDetail(this.brandInfo).then(res=>{
          if(res.errorcode==0){
            let data = res.result;
             this.initData();
        }else {

          }
      })*/

      },
      handleReset(data){

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
