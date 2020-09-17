<template>
    <div class="container">
        <el-form>
            <el-form-item v-model="managerForm" label="学号:" label-width="60px">
                <el-input placeholder="请输入想要修改的学生的学号" v-model="managerForm.userId"></el-input>
            </el-form-item>
            <el-form-item v-model="managerForm" label="学校:" label-width="60px">
                <el-select v-model="managerForm.school">
                    <el-option
                        v-for="item in schools"
                        :key="item.label"
                        :label="item.label"
                        v-model="item.value"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-model="managerForm" label="角色:" label-width="60px">
                <el-select v-model="managerForm.role">
                    <el-option
                        v-for="item in options"
                        :key="item.label"
                        :label="item.label"
                        v-model="item.label"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item class="btns">
                <el-button @click="handleSubmit" type="primary">修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            managerForm: {
                userId: "",
                role: "",
                school: "",
            },
            options: [
                {
                    label: "班委",
                },
                {
                    label: "普通学生",
                },
            ],
            schools: [
                {
                    label: "金陵科技学院",
                    value: 'JIT',
                }
            ]
        };
    },
    methods: {
        async handleSubmit() {
            // 班委设置
            if(this.managerForm.role === "班委") {
                let params = new URLSearchParams();
                params.append('studentNumber', this.managerForm.userId);
                params.append('school', this.managerForm.school);
                const res = await this.$http.post('/user/committee/appointment', params);
                // console.log(res);
                if(res.data.code !== 200) return this.$message.error(res.data.msg);
                return this.$message.success('修改成功');
            }
            // 班委撤职
            if(this.managerForm.role === "普通学生") {
                let params = new URLSearchParams();
                params.append('studentNumber', this.managerForm.userId);
                params.append('school', this.managerForm.school);
                const res = await this.$http.post('/user/committee/dismiss', params);
                // console.log(res);
                if(res.data.code !== 200) return this.$message.error(res.data.msg);
                return this.$message.success('修改成功');
            }
        }
    }
};
</script>

<style lang="less" scoped>
.container {
    width: 400px;
    height: 250px;
    margin: auto;
    margin-top: 115px;
    border-radius: 20px;
    padding: 20px;
    padding-top: 35px;
    background-color: #fff;
}
.el-input {
    width: 300px;
}
.btns {
    display: flex;
    justify-content: flex-end;
}
</style>