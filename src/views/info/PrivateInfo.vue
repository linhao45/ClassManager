<template>
    <div class="info_container">
        <div class="info_box">
            <div class="avater_box">
                <el-avatar :size="110"></el-avatar>
            </div>
            <el-form v-model="info" class="info_form" label-width="80px">
                <!-- 基本信息  分割线 -->
                <el-divider content-position="left">
                    基本信息
                    <i class="el-icon-user"></i>
                </el-divider>
                <!-- 用户名
                <el-form-item label="用户名：">
                    <el-input v-model="info.basic.name" :disabled="isDisable"></el-input>
                </el-form-item> -->
                <!-- 姓名 -->
                <el-form-item label="姓名：">
                    <el-input v-model="info.basic.name" disabled></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="11">
                        <!-- 学校 -->
                        <el-form-item label="学校：">
                            <el-input v-model="info.basic.school" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="13">
                        <!-- 专业 -->
                        <el-form-item label="学院：">
                            <el-input v-model="info.basic.institude" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <!-- 班级 -->
                        <el-form-item label="班级：">
                            <el-input v-model="info.basic.classroom" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="13">
                        <!-- 学号 -->
                        <el-form-item label="学号：">
                            <el-input v-model="info.basic.studentNumber" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- 联系方式  分割线 -->
                <el-divider content-position="left">
                    联系方式
                    <i class="el-icon-mobile-phone"></i>
                </el-divider>
                <el-row>
                    <el-col :span="11">
                        <!-- 电话 -->
                        <el-form-item label="电话：">
                            <el-input v-model="info.extend.phoneNumber" :disabled="isDisable"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="13">
                        <!-- 支付宝 -->
                        <el-form-item label="支付宝：">
                            <el-input v-model="info.extend.alipay" :disabled="isDisable"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <!-- qq -->
                        <el-form-item label="qq：">
                            <el-input v-model="info.extend.qq" :disabled="isDisable"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="13">
                        <!-- 微信 -->
                        <el-form-item label="微信：">
                            <el-input v-model="info.extend.wechat" :disabled="isDisable"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- 按钮 -->
                <el-form-item class="btns">
                    <el-button v-show="!isDisable" @click="changeUpdateDialog" type="primary">确认修改</el-button>
                    <el-button v-show="!isDisable" @click="changeDisable" type="info">取消</el-button>
                    <el-button v-show="isDisable" @click="$message.info('暂时未开通个人信息修改功能')" type="primary">修改个人信息</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // input是否处于不可修改的状态
            isDisable: true,
            // 用户信息
            info: {
                // 基本信息
                basic: {
                    // userId: "1L",
                    // studentNumber: "1812001000",
                    // name: "Somebody",
                    // classroom: "1",
                    // institude: "Software",
                    // major: "C.S.",
                    // grade: "2018",
                    // school: "JIT",
                },
                // 扩展信息
                extend: {
                    // userId: "1L",
                    // icon: "https://q1.qlogo.cn/g?b=qq&nk=2508826394&s=640",
                    // qq: "2508826394L",
                    // wechat: "d2508826394",
                    // alipay: "MyALiPay",
                    // phoneNumber: "15651731700L",
                },
            },
        };
    },
    computed: {
        computUsername() {
            return this.$store.state.username
        }
    },
    created() {
        this.isDisable = true;
        this.getUserInfo();
    },
    methods: {
        // 获取用户信息（基本+扩展）
        async getUserInfo() {
            // 获取基本信息
            const res = await this.$http.get("/user/toStudent");
            // console.log(res);
            if(res.data.code != 200) return this.$message.error("获取个人信息失败，请刷新重试");
            this.info.basic = res.data.data;
            // 获取扩展信息
            const res2 = await this.$http.get("/user/extension");
            if(res.data.code != 200) return this.$message.error("获取个人信息失败，请刷新重试");
            this.info.extend = res2.data.data;
            console.log(this.info.basic)
            console.log(this.info.extend)
        },
        // 修改编辑状态
        changeDisable() {
            this.isDisable = !this.isDisable;
        },
        // 修改对话框显示
        changeUpdateDialog() {
            this.updateDialogVisible = !this.updateDialogVisible
        },
        // 提交修改
        handleSubmit() {
            
        },
    },
};
</script>

<style lang="less" scoped>
.info_box {
    width: 600px;
    background-color: #fff;
    border-radius: 3px;
    margin: auto;
    // position: absolute;
    // left: 55%;
    // top: 55%;
    // transform: translate(-50%, -50%);
    border-radius: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    content: "";
    display: block;
    clear: both;
}

.btns {
    display: flex;
    justify-content: flex-end;
}

.info_form {
    width: 100%;
    // position: absolute;
    // bottom: 35px;
    padding: 20px;
    box-sizing: border-box;
}

.avater_box {
    padding-top: 20px;
    display: flex;
    justify-content: center;
}
</style>