<template>
    <div class="padding_limit">
        <!-- 面包屑导航 -->
        <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/taskfinished' }">已完成</el-breadcrumb-item>
            <el-breadcrumb-item>任务列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 卡片视图 -->
        <el-card>
            <!-- 搜索与添加区域 -->
            <el-row :gutter="20">
                <el-col :span="13">
                    <el-input placeholder="请输入搜索的内容">
                        <el-button
                            @click="$message.info('该功能未开通')"
                            slot="append"
                            icon="el-icon-search"
                        ></el-button>
                    </el-input>
                </el-col>
            </el-row>
            <!-- 任务表格 -->
            <el-table :data="tasklist" border stripe>
                <!-- 编号 -->
                <el-table-column align="center" type="index" label="编号" :resizable="false"></el-table-column>
                <!-- 名称 -->
                <el-table-column align="center" prop="taskName" label="名称" :resizable="false"></el-table-column>
                <!-- 开始时间 -->
                <el-table-column align="center" label="开始时间" :resizable="false">
                    <template v-slot:default="scope">
                        <i class="el-icon-time"></i>
                        <span
                            style="margin-left: 10px;"
                        >{{dataToNormalFormat(scope.row.taskBeginTime)}}</span>
                    </template>
                </el-table-column>
                <!-- 结束时间 -->
                <el-table-column align="center" label="结束时间" :resizable="false">
                    <template v-slot:default="scope">
                        <i class="el-icon-time"></i>
                        <span
                            style="margin-left: 10px;"
                        >{{dataToNormalFormat(scope.row.taskEndTime)}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" :resizable="false">
                    <template v-slot="scope">
                        <el-button
                            @click="downloadById(scope.row.taskId)"
                            icon="el-icon-download"
                            type="primary"
                        >下载</el-button>
                        <!-- 上传 -->
                        <el-upload
                            class="upload"
                            :headers="header"
                            :action="uploadURL"
                            :data="{taskId: scope.row.taskId}"
                            :on-success="reload"
                            :on-remove="reload"
                        >
                            <el-button icon="el-icon-upload2" type="info">重新上传</el-button>
                        </el-upload>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
import fileDownload from "js-file-download";
export default {
    data() {
        return {
            // 任务列表
            tasklist: [
                // {
                //     taskId: 1,
                //     luncherId: 2,
                //     taskBeginTime: "2020_09_06_20_20",
                //     taskEndTime: "2020_09_13_20_20",
                //     undoIds: [1, 4],
                //     doneIds: [2, 3, 5, 6, 7, 8],
                //     taskName: "班级文档管理接口文档",
                //     taskFileDirectory: "",
                //     taskFileTemplate: "/home/file/template/qwer.txt",
                //     taskFileSample: "/home/file/sample/asdf.txt",
                //     format: "&*#",
                // },
                // {
                //     taskId: 2,
                //     luncherId: 2,
                //     taskBeginTime: "2020_09_06_20_20",
                //     taskEndTime: "2020_09_12_20_20",
                //     undoIds: [],
                //     doneIds: [1, 2, 3, 4, 5, 6, 7, 8],
                //     taskName: "青年大学习",
                //     taskFileDirectory: "",
                //     taskFileTemplate: "/home/file/template/qwer.txt",
                //     taskFileSample: "/home/file/sample/asdf.txt",
                //     format: "*&#",
                // },
            ],
            // 请求头token
            header: {
                token: window.sessionStorage.getItem("token"),
            },
            // 上传地址
            uploadURL: "https://api.jitclass.cn/file/upload",
        };
    },
    created() {
        this.getTasksList();
    },
    methods: {
        // 获取任务列表
        async getTasksList() {
            let flag = false;
            const res = await this.$http.get("/user/userTasks");
            if (res.data.code != 200)
                return this.$message.error("获取任务失败");
            // console.log(res);
            // 循环遍历 获取用户发布任务的详细信息
            for (let i = 0; i < res.data.data.doneTasks.length; ++i) {
                let params = new URLSearchParams();
                params.append("taskId", res.data.data.doneTasks[i]);
                const task = await this.$http.post(
                    "/user/taskIdToTask",
                    params
                );
                if (task.data.code != 200) flag = true;
                this.tasklist.push(task.data.data);
            }
            if (flag) this.$message.error("获取任务列表出现一些问题");
        },
        // 控制日期格式输出
        dataToNormalFormat(data) {
            return (
                data.substr(0, 4) +
                "-" +
                data.substr(5, 2) +
                "-" +
                data.substr(8, 2)
            );
        },
        // 下载文件
        async downloadById(id) {
            let params = new URLSearchParams();
            params.append("taskId", id);
            const res = await this.$http.post("/file/download", params);
            const uuid = res.data.data;
            let a = document.createElement("a");
            a.href =
                `${this.$store.state.downloadURL}` +
                uuid;
            document.body.appendChild(a);
            a.click(); //下载
            URL.revokeObjectURL(a.href); // 释放URL 对象
            document.body.removeChild(a); // 删除 a 标签
        },
        // 刷新页面
        reload() {
            location.reload();
        },
    },
};
</script>

<style lang="less" scoped>
.el-table th.gutter {
    display: table-cell !important;
}
.infoTable_box {
    margin: auto;
    width: 650px;
    text-align: center;
}
.line {
    text-align: center;
}
.btns {
    display: flex;
    justify-content: flex-end;
}
.expandTitle {
    letter-spacing: 3px;
}
.upload {
    display: inline-block;
    margin-left: 10px;
}
</style>