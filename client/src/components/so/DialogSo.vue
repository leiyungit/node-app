<template>
  <div class="dialogSo">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
      :width="dialog.width"
    >
      <div class="form">
        <el-form ref="form" 
            :model="formData" 
            :rules="form_rules" 
            label-width="120px" 
            style="margin:10px;width:auto;">

          <el-form-item label="内部PO:" prop="so">
            <el-input v-model="formData.so"></el-input>
          </el-form-item>
          <el-form-item label="生产型号:" prop="prod">
            <el-input v-model="formData.prod"></el-input>
          </el-form-item>
          <el-form-item label="交期:" prop="date">
            <el-date-picker v-model="formData.date" type="date" placeholder="选择交货日期"></el-date-picker>
          </el-form-item>
           <el-form-item label="状态:" prop="status">
            <el-select v-model="formData.status" placeholder="状态">
              <el-option v-for="(formtype,index) in format_type_list" :key="index" :label="formtype" :value="formtype"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注:">
            <el-input v-model="formData.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">提交</el-button>
            <el-button @click="dialog.show=false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "dialogSo",
  props: {
    dialog: Object,
    formData: Object
  },
  data() {
    return {
     
      format_type_list: [
        "市场审批通过",
        "市场取消",
        "计划接收",
        "计划排单中",
        "计划排单完结"
      ],
      form_rules:{
        //   so: [
        //     { required: true, message: '请输入内部PO', trigger: 'blur' }
        //   ],
        //   prod: [
        //     { required: true, message: '生产型号不能为空', trigger: 'blur' }
        //   ],
        //   date: [
        //     { required: true, message: '交期不能为空', trigger: 'blur' }
        //   ],
        //   status: [
        //     { required: true, message: '请选择一个状态', trigger: 'change' }
        //   ]
      }
    };
  },
  methods:{
      onSubmit(form){
          this.$refs[form].validate(valid=>{
              if(valid){
                  console.log(this.formData)
                  const url=this.dialog.option=='add'?'add':`edit/${this.formData._id}`;
                //   this.$axios.post(`/api/profiles/${url}`,this.formData)
                //   .then(res=>{
                //       this.$message({message:"保存成功",type:"success"});
                //       this.dialog.show=false;
                //       this.$emit("update");
                //   })
              }
          })
         
      }
  }
};
</script>
<style scoped>
</style>