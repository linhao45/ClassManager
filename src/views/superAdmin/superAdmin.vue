<template>
    <div class="login_container">
        <div class="login_box">
            <el-form ref="formRef" :rules="formRules" v-model="managerForm">
                <el-form-item label="学号:" label-width="60px">
                    <el-input placeholder="请输入想要修改的学生的学号" v-model="managerForm.userId"></el-input>
                </el-form-item>
                <el-form-item label="学校:" label-width="60px">
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
    </div>
</template>

<script>
import axios from "axios";
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
                    label: "班长",
                },
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
                    value: "JIT",
                },
            ],
            formRules: {
                userId: [
                    {
                        required: true,
                        message: "请输入学号",
                        trigger: "blur",
                    },
                ],
                role: [
                    {
                        required: true,
                        message: "请选择角色",
                        trigger: "blur",
                    },
                ],
                school: [
                    {
                        required: true,
                        message: "请选择学校",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        async handleSubmit() {
            // 班委设置
            if (this.managerForm.role === "班委") {
                let params = new URLSearchParams();
                params.append("studentNumber", this.managerForm.userId);
                params.append("school", this.managerForm.school);
                const res = await this.$http.post(
                    "/user/committee/appointment",
                    params
                );
                // console.log(res);
                if (res.data.code !== 200)
                    return this.$message.error(res.data.msg);
                return this.$message.success("修改成功");
            }
            // 班委撤职
            if (this.managerForm.role === "普通学生") {
                let params = new URLSearchParams();
                params.append("studentNumber", this.managerForm.userId);
                params.append("school", this.managerForm.school);
                const res = await this.$http.post(
                    "/user/committee/dismiss",
                    params
                );
                // console.log(res);
                if (res.data.code !== 200)
                    return this.$message.error(res.data.msg);
                return this.$message.success("修改成功");
            }
            // 班长设置
            if (this.managerForm.role === "班长") {
                let params = new URLSearchParams();
                params.append("studentNumber", this.managerForm.userId);
                params.append("school", this.managerForm.school);
                const res = await this.$http.post(
                    "/user/monitor/appointment",
                    params
                );
                // console.log(res);
                if (res.data.code !== 200)
                    return this.$message.error(res.data.msg);
                return this.$message.success("修改成功");
            }
        },
    },
};
</script>

<style lang="less" scoped>
.login_container {
    background-color: #2b4b6b;
    height: 100%;
    background-image: url(/img/today.php);
}

.login_box {
    width: 450px;
    height: 250px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    padding: 20px;
    padding-top: 40px;
}

.login_titile {
    color: #fff;
    letter-spacing: 20px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -550%);
}

.btns {
    display: flex;
    justify-content: flex-end;
}

.login_form {
    width: 100%;
    position: absolute;
    bottom: 35px;
    padding: 0 20px;
    box-sizing: border-box;
}
</style>