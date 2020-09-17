<template>
    <div class="login_container">
        <div class="login_titile">
            <h1>超级管理员登录</h1>
        </div>
        <div class="login_box">
            <!-- 登录表单 -->
            <el-form
                ref="loginFormRef"
                :model="loginForm"
                :rules="loginFormRules"
                class="login_form"
            >
                <!-- 用户名 -->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input
                        v-model="loginForm.password"
                        prefix-icon="el-icon-lock"
                        type="password"
                        @keyup.enter.native="loginFormSubmit"
                    ></el-input>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item class="btns">
                    <el-button @click="loginFormSubmit" type="primary">登录</el-button>
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
            // 登录表单数据绑定
            loginForm: {
                username: "",
                password: "",
            },
            // 表单验证规则对象
            loginFormRules: {
                // 验证用户名是否合法
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur",
                    },
                    {
                        min: 3,
                        max: 100,
                        message: "长度在 3 到 10 个字符",
                        trigger: "blur",
                    },
                ],
                // 验证密码是否合法
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur",
                    },
                    {
                        min: 6,
                        max: 15,
                        message: "长度在 6 到 15 个字符",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    methods: {
        // 登录，提交表单
        loginFormSubmit() {
            this.$refs.loginFormRef.validate(async (valid) => {
                if (!valid) {
                    return this.$message.error("登录信息不合法");
                }
                let param = new URLSearchParams();
                param.append("username", this.loginForm.username);
                param.append("password", this.loginForm.password);
                const res = await this.$http.post("/admin/login", param);

                // 判断登录状态
                if (res.data.code != 200) {
                    return this.$message.error("登陆失败");
                }

                window.sessionStorage.setItem("token", res.data.data.token);

                const res2 = await this.$http.get("/user/isAdmin");

                if (res2.data.code !== 200) {
                    return this.$message.error("用户密码错误");
                    window.sessionStorage.removeItem("token");
                }
                this.$message.success("登录成功");
                this.$store.commit("setUsername", this.loginForm.username);
                this.$router.push("/adminmanager");
            });
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
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
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