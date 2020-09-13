<template>
    <div class="login_container">
        <div class="login_titile">
            <h1>班级管理系统</h1>
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
                    ></el-input>
                </el-form-item>
                <!-- 按钮 -->
                <el-form-item class="btns">
                    <el-button @click="loginFormSubmit" type="primary">登录</el-button>
                    <el-button @click="changeRigsterDialog" type="info">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 注册对话框 -->
        <div>
            <el-dialog :visible.sync="rigsterDialogVisible">
                <!-- 注册表单 -->
                <el-form
                    ref="rigsterFormRef"
                    :model="rigsterForm"
                    :rules="rigsterFormRules"
                    label-width="100px"
                >
                    <el-row>
                        <el-col :span="17">
                            <el-form-item label="用户名:" prop="username">
                                <el-input placeholder="请输入邮箱作为用户名" v-model="rigsterForm.username"></el-input>
                            </el-form-item>
                        </el-col>
                        <!-- 获取邮箱验证码 -->
                        <el-col :offset="1" :span="6">
                            <el-button @click="getVerfiCode">获取邮箱验证码</el-button>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="11">
                            <el-form-item label="验证码:" prop="verficationCode">
                                <el-input placeholder="请输入邮箱验证码" v-model="verfiCode"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item label="昵称:" prop="nickname">
                        <el-input placeholder="请输入昵称" v-model="rigsterForm.nickname"></el-input>
                    </el-form-item>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="密码:" prop="password">
                                <el-input
                                    placeholder="请输入密码"
                                    type="password"
                                    autocomplete="new-password"
                                    show-password
                                    v-model="rigsterForm.password"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="确认密码:" prop="checkpassword">
                                <el-input
                                    placeholder="请确认密码"
                                    type="password"
                                    autocomplete="new-password"
                                    show-password
                                    v-model="rigsterForm.checkpass"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="学号:" prop="studentNumber">
                                <el-input placeholder="请输入学号" v-model="rigsterForm.studentNumber"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="学校:" prop="school">
                                <el-input placeholder="请输入学校名称" v-model="rigsterForm.school"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-form-item class="btns">
                            <el-button @click="rigsterFormSubmit" type="primary">注册</el-button>
                            <el-button @click="changeRigsterDialog" type="info">取消</el-button>
                        </el-form-item>
                    </el-row>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        // 验证密码
        var checkpass = (rule, value, callback) => {
            var v = this.rigsterForm.checkpass;
            if (v === "") {
                callback(new Error("请再次输入密码"));
            } else if (v !== this.rigsterForm.password) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        //验证邮箱
        var checkEmail = (rule, value, callback) => {
            //验证邮箱的正则
            var regEmail = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
            if (regEmail.test(value)) return callback();
            callback(new Error("请输入正确的邮箱！"));
        };
        // 验证邮箱验证码
        var checkVerficationCode = (rule, value, callback) => {
            if (!this.checkCode()) {
                console.log(this.checkCode());
                callback("验证码错误");
            }
            callback();
        };
        return {
            // 登录表单数据绑定
            loginForm: {
                username: "",
                password: "",
            },
            rigsterForm: {
                username: "",
                password: "",
                checkpass: "",
                nickname: "",
                studentNumber: "",
                school: "",
            },
            // 邮箱验证码
            verfiCode: "",
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
            // 注册表单验证规则
            rigsterFormRules: {
                // 验证用户名是否为合法邮箱
                username: [
                    { required: true, message: "请输入邮箱", trigger: "blur" },
                    { validator: checkEmail, trigger: "blur" },
                ],
                // 邮箱验证码
                verficationCode: [
                    {
                        required: true,
                        validator: checkVerficationCode,
                        trigger: "blur",
                    },
                ],
                // 昵称
                nickname: [
                    { required: true, message: "请输入昵称", trigger: "blur" },
                ],
                // 验证密码是否合法
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    {
                        min: 0,
                        max: 256,
                        message: "密码太短或者太长了",
                        trigger: "blur",
                    },
                ],
                // 验证两次输入的密码是否正确
                checkpassword: [{ validator: checkpass, trigger: "blur" }],
                // 学号
                studentNumber: [
                    { required: true, message: "请输入学号", trigger: "blur" },
                ],
                // 学校
                school: [
                    { required: true, message: "请输入学校", trigger: "blur" },
                ],
            },
            // 注册对话框的是否显示
            rigsterDialogVisible: false,
        };
    },
    methods: {
        // 登录，提交表单
        loginFormSubmit() {
            this.$refs.loginFormRef.validate(async (valid) => {
                // console.log(valid);
                if (!valid) {
                    return this.$message.error("登录信息不合法");
                }
                let param = new URLSearchParams();
                param.append("username", this.loginForm.username);
                param.append("password", this.loginForm.password);
                const res = await this.$http.post('/login', param);
                
                // const res = await this.$http.post('/login', this.loginForm);

                console.log(res);

                // 判断登录状态
                if (res.data.code != 200) {
                    return this.$message.error("登陆失败");
                }
                this.$message.success("登录成功");

                // 保存用户名信息到store，方便后续二次验证直接调取用户名
                this.$store.commit("setUsername", this.loginForm.username);

                // 保存token
                // 实现编程式导航跳转到'home'
                window.sessionStorage.setItem("token", res.data.data.token);
                this.$router.push("/home");
            });
        },
        // 注册，提交表单
        rigsterFormSubmit() {
            this.$refs.rigsterFormRef.validate(async (valid) => {
                // console.log(valid);
                if (!valid) {
                    return this.$message.error("注册信息不合法");
                }
                const result = await this.$http.post("sign", this.rigsterForm);
                // console.log(res);
                if (result.code !== 200) {
                    return this.$message.error(result.msg);
                }
                this.$message.success("登录成功");
            });
        },
        // 控制注册对话框的显示关闭
        changeRigsterDialog() {
            this.rigsterDialogVisible = !this.rigsterDialogVisible;
        },
        // 检查验证码是否正确
        async checkCode() {
            const data = await this.$http.post(
                `sign/verityCode/${this.rigsterForm.username}`,
                this.verfiCode
            );
            if (data.code !== 200) return false;
            return true;
        },
        // 获取邮箱验证码
        async getVerfiCode() {
            //验证邮箱的正则
            var regEmail = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
            if (!regEmail.test(this.rigsterForm.username))
                return this.$message.error("请填写正确的邮箱地址");
            const data = await this.$http.get(
                `sign/sendVerificationCode/${this.rigsterForm.username}`
            );
            if (data.code !== 200) return this.$message.error("发送请求错误");
            return this.$message.success("发送成功，请尽快前往邮箱获取");
        },
    },
};
</script>

<style lang="less" scoped>
.login_container {
    background-color: #2b4b6b;
    height: 100%;
    background-image: url(http://picture.youaremine.vip/today.php);
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