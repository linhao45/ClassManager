<template>
    <div class="padding_limit">
        <!-- 面包屑导航 -->
        <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/tasklaunch' }">我的发布</el-breadcrumb-item>
            <el-breadcrumb-item>任务列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 发布任务对话框 -->
        <div>
            <el-dialog width="600px" title="发布任务" :visible.sync="addTaskDialogVisible">
                <el-form 
                    ref="addTaskFormRef" 
                    :rules="taskFormRuls" 
                    label-width="100px" 
                    :model="addTaskForm"
                    >
                    <!-- 活动名称填写 -->
                    <el-form-item prop="name" label="活动任务">
                        <el-input v-model="addTaskForm.name"></el-input>
                    </el-form-item>
                    <!-- 选择时间 -->
                    <el-form-item prop="time" label="时间范围">
                        <el-row>
                            <el-col>
                                <el-date-picker
                                    type="daterange"
                                    unlink-panels
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    placeholder="请选择/输入日期"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                    v-model="addTaskForm.time"
                                ></el-date-picker>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <!-- 选择命名模板 -->
                    <el-form-item prop="format" label="文件名格式">
                        <el-select
                            v-model="addTaskForm.format"
                            placeholder="请慎重选择，发布后不支持修改此选项"
                            style="width: 85%;"
                        >
                            <el-option
                                v-for="item in options"
                                :key="item.label"
                                :label="item.label"
                                v-model="item.value"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 按钮 -->
                    <el-form-item class="btns">
                        <el-button @click="handleAddTaskSubmit" type="primary">发布</el-button>
                        <el-button @click="changeAddTaskDialog" type="info">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>

        <!-- 修改任务对话框 -->
        <div>
            <el-dialog width="600px" title="修改任务" :visible.sync="editTaskDialogVisible">
                <el-form ref="editFormRef" :rules="taskFormRuls" label-width="100px" v-model="editTaskForm">
                    <el-form-item label="活动任务">
                        <el-input disabled v-model="editTaskForm.name"></el-input>
                    </el-form-item>
                    <el-form-item prop="time" label="开始时间">
                        <el-row>
                            <el-col>
                                <el-date-picker
                                    type="daterange"
                                    unlink-panels
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    placeholder="请选择/输入日期"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                    v-model="editTaskForm.time"
                                ></el-date-picker>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <!-- 选择命名模板 -->
                    <el-form-item label="文件名格式">
                        <el-select disabled
                            v-model="editTaskForm.format.label"
                            style="width: 85%;"
                            >
                        </el-select>
                    </el-form-item>
                    <!-- 按钮 -->
                    <el-form-item class="btns">
                        <el-button @click="handleEditTaskSubmit()" type="primary">修改</el-button>
                        <el-button
                            @click="editTaskDialogVisible = !editTaskDialogVisible;"
                            type="info"
                        >取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>

        <!-- 卡片视图 -->
        <el-card>
            <!-- 搜索与添加区域 -->
            <el-row :gutter="20">
                <el-col :span="13">
                    <el-input placeholder="请输入搜索的内容">
                        <el-button @click="$message.info('该功能未开通')" slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button @click="changeAddTaskDialog" type="primary">发布任务</el-button>
                </el-col>
            </el-row>
            <!-- 任务表格 -->
            <el-table
                :data="tasklist"
                border
                stripe
                @expand-change="expandSelect"
                :row-key="getRowKeys"
                :expand-row-keys="expandList"
            >
                <!-- 展开栏 -->
                <el-table-column type="expand" align="center" label="详情" :resizable="false">
                    <template v-slot="scope1">
                        <div class="infoTable_box">
                            <p class="expandTitle">未提交名单</p>
                            <el-table :data="unDoPeop" width="500px">
                                <el-table-column align="center" type="index" label></el-table-column>
                                <el-table-column align="center" prop="studentNumber" label="学号/证件号"></el-table-column>
                                <el-table-column align="center" prop="name" label="姓名"></el-table-column>
                            </el-table>
                            <p class="expandTitle" style="margin-top: 12px">已提交名单</p>
                            <el-table :data="DonePeop" width="500px">
                                <el-table-column align="center" type="index" label></el-table-column>
                                <el-table-column align="center" prop="studentNumber" label="学号/证件号"></el-table-column>
                                <el-table-column align="center" prop="name" label="姓名"></el-table-column>
                                <el-table-column align="center" label="操作">
                                    <template v-slot="scope2">
                                        <el-button
                                            @click="downloadById(scope1.row.taskId, scope2.row.userId)"
                                            type="warning"
                                            icon="el-icon-download"
                                        >下载附件</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </template>
                </el-table-column>
                <!-- 编号 -->
                <el-table-column align="center" type="index" label="编号" :resizable="false"></el-table-column>
                <!-- 名称 -->
                <el-table-column align="center" prop="taskName" label="名称" :resizable="false"></el-table-column>
                <!-- 开始时间 -->
                <el-table-column align="center" label="开始时间" :resizable="false">
                    <template v-slot:default="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px;">{{dataToNormalFormat(scope.row.taskBeginTime)}}</span>
                    </template>
                </el-table-column>
                <!-- 结束时间 -->
                <el-table-column align="center" label="结束时间" :resizable="false">
                    <template v-slot:default="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px;">{{dataToNormalFormat(scope.row.taskEndTime)}}</span>
                    </template>
                </el-table-column>
                <!-- 完成情况 -->
                <el-table-column align="center" label="完成情况（未提交名单见详情）" :resizable="false">
                    <template v-slot:default="scope">
                        <i
                            v-if="scope.row.undoIds.length == 0"
                            class="el-icon-circle-check"
                            style="color: green; font-size: 15px;"
                        >已完成</i>
                        <span
                            v-else
                        >{{scope.row.doneIds.length}} / {{scope.row.undoIds.length + scope.row.doneIds.length}}</span>
                    </template>
                </el-table-column>
                <!-- 操作 -->
                <el-table-column align="center" label="操作 (编辑|删除|下载)" :resizable="false">
                    <template v-slot:default="scope">
                        <div>
                            <el-button
                                @click="changeEditTaskDialog(scope)"
                                type="primary"
                                icon="el-icon-edit"
                            ></el-button>
                            <el-button
                                @click="removeById(scope.row.taskId)"
                                type="danger"
                                icon="el-icon-delete"
                            ></el-button>
                            <el-button @click="downloadAll(scope.row.taskId)" type="warning" icon="el-icon-download"></el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
import fileDownload from 'js-file-download';
export default {
    data() {
        return {
            // 展开行id
            expandList: [],
            // 获取当前行id
            getRowKeys(row) {
                return row.taskId;
            },
            // 该scope.row.id任务未完成任务人员名单
            unDoPeop: [
                // {
                //     userId: "1L",
                //     studentNumber: "1812001000",
                //     name: "张三",
                //     classroom: "1",
                //     institude: "Software",
                //     major: "C.S.",
                //     grade: "2018",
                //     school: "JIT",
                // },
            ],
            // 该scope.row.id任务已完成任务人员名单
            DonePeop: [
                // {
                //     userId: "1L",
                //     studentNumber: "1812001000",
                //     name: "李四",
                //     classroom: "1",
                //     institude: "Software",
                //     major: "C.S.",
                //     grade: "2018",
                //     school: "JIT",
                // },
            ],
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
                //     taskName: "班级文档管理接口文档",
                //     taskFileDirectory: "",
                //     taskFileTemplate: "/home/file/template/qwer.txt",
                //     taskFileSample: "/home/file/sample/asdf.txt",
                //     format: "*&#",
                // },
            ],
            // 查询参数
            queryInfo: {
                query: "",
                pagenum: 1,
                pagesize: 10,
            },
            // 控制添加任务对话框显示
            addTaskDialogVisible: false,
            // 控制编辑任务对话框显示
            editTaskDialogVisible: false,
            // 添加任务表单
            addTaskForm: {
                name: "",
                time: [],
                format: "",
            },
            // 编辑任务表单
            editTaskForm: {
                taskId: "",
                name: "",
                time: [],
                format: {
                    label: '',
                    value: '',
                },
            },
            // 命名格式
            options: [
                {
                    label: "任务名--学号--姓名",
                    value: '#*&',
                },
                {
                    label: "任务名--姓名--学号",
                    value: '#&*',
                },
                {
                    label: "学号--姓名--任务名",
                    value: '*&#',
                },
                {
                    label: "姓名--学号--任务名",
                    value: '&*#',
                },
                {
                    label: "姓名--学号",
                    value: '&*',
                },
                {
                    label: "学号--姓名",
                    value: '*&',
                },
                {
                    label: "姓名",
                    value: '&',
                },
                {
                    label: "学号",
                    value: '*',
                },
            ],
            // 添加、修改表单验证规则
            taskFormRuls: {
                name: [
                    { required: true, message: "请输入名称", trigger: "blur", },
                ],
                time: [
                    { required: true, message: "请选择任务时间", trigger: "blur", },
                ],
                format: [
                    { required: true, message: "请选择命名格式", trigger: "blur", },
                ]
            },

        };
    },
    created() {
        this.getTasksList();
    },
    methods: {
        // 折叠面板每次只能展开一行,同时控制未完成、已完成的名单
        async expandSelect(row, expandedRows) {
            let flag = false;
            var that = this;
            if (expandedRows.length) {
                that.expandList = [];
                if (row) {
                    that.expandList.push(row.taskId);
                }
            } else {
                that.expandList = [];
            }
            console.log(row);
            // 获取已完成用户、未完成用户的详细信息
            // this.unDoPeop.splice(0, this.unDoPeop.length);
            // this.DonePeop.splice(0, this.DonePeop.length);
            let tmpunDoPeop = [];
            let tmpDonePeop = [];
            for(let i = 0; i < row.undoIds.length; ++i) {
                const user = await this.$http.get('/user/toStudent', {
                    userId: row.undoIds[i]
                })
                if(user.data.code != 200) flag = true;
                else tmpunDoPeop.push(user.data.data);
            }
             for(let i = 0; i < row.doneIds.length; ++i) {
                const user = await this.$http.get('/user/toStudent', {
                    userId: row.doneIds[i]
                })
                if(user.data.code != 200) flag = true;
                else tmpDonePeop.push(user.data.data);
            }
            if(flag)    this.$message.error('获取信息出现错误');
            this.unDoPeop = tmpunDoPeop;
            this.DonePeop = tmpDonePeop;
            console.log(this.unDoPeop);
            console.log(this.DonePeop);
        },
        // 获取任务列表
        async getTasksList() {
            let flag = false;
            const res = await this.$http.get("/user/userTasks");
            // console.log(res);
            if(res.data.code != 200) return this.$message.error('获取任务失败');
            // 循环遍历 获取用户发布任务的详细信息
            for(let i = 0; i < res.data.data.lunchedTasks.length; ++i) {
                let params = new URLSearchParams();
                params.append('taskId', res.data.data.lunchedTasks[i])
                // console.log(res.data.data.lunchedTasks[i]);
                const task = await this.$http.post('/user/taskIdToTask', params);
                // console.log(task);
                if(task.data.code != 200)   flag = true;
                else this.tasklist.push(task.data.data);
                if(!this.tasklist[i].doneIds)   this.tasklist[i].doneIds = [];
                if(!this.tasklist[i].undoIds)   this.tasklist[i].undoIds = [];
                // console.log(this.tasklist[i])
            }
            if(flag)    this.$message.error('获取任务列表出现一些问题');
        },
        // 根据任务id删除任务
        removeById(id) {
            // 弹框询问是否确认删除
            this.$confirm("此操作将永久删除该任务, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(async res1 => {
                // console.log(res);
                let params = new URLSearchParams();
                params.append('taskId', id)
                const res2 = await this.$http.post('/task/delete', params);
                if(res2.data.code != 200) return this.$message.error('删除失败');
                this.$message.success('删除成功');
                location.reload();
            }).catch(error => {
                
            })
            
        },
        // 改变添加任务对话框状态
        changeAddTaskDialog() {
            this.addTaskDialogVisible = !this.addTaskDialogVisible;
        },
        // 改变编辑任务对话框状态
        changeEditTaskDialog(scope) {
            console.log(scope);
            this.editTaskForm.taskId = scope.row.taskId;
            this.editTaskForm.name = scope.row.taskName;
            let tmptime = [];
            tmptime[0] = this.dataToNormalFormat(scope.row.taskBeginTime);
            tmptime[1] = this.dataToNormalFormat(scope.row.taskEndTime);
            this.editTaskForm.time = tmptime;
            let tmp = {
                '*': '学号',
                '&': '姓名',
                '#': '任务名',
            }
            let strtmp = tmp[scope.row.format[0]];
            for(let i = 1; i < scope.row.format.length; ++i) {
                strtmp = strtmp + '--' + tmp[scope.row.format[i]];
            }
            // console.log(strtmp);
            this.editTaskForm.format.label = strtmp;
            this.editTaskForm.format.value = scope.row.format;
            // console.log(this.editTaskForm.format)
            this.editTaskDialogVisible = !this.editTaskDialogVisible;
        },
        // 增加任务
        handleAddTaskSubmit() {
            this.$refs.addTaskFormRef.validate(async valid => {
                console.log(this.addTaskForm.format);
                // console.log(valid);
                if(!valid)  {
                    return this.$message.error("格式不合法");
                }
                let params = new URLSearchParams();
                params.append('taskName', this.addTaskForm.name);
                params.append('format', this.addTaskForm.format);
                params.append('taskBeginTime', this.dataToUploadFormat(this.addTaskForm.time[0]));
                params.append('taskEndTime', this.dataToUploadFormat(this.addTaskForm.time[1]));
                const res = await this.$http.post('/task/launch', params);
                // console.log(res);
                if(res.data.code != 200) return this.$message.error('添加任务失败');
                this.$message.success('任务添加成功');
                this.changeAddTaskDialog();
                location.reload();
            })
        },
        // 修改任务
        async handleEditTaskSubmit() {
            // console.log(this.editTaskForm.taskId);
            let params = new URLSearchParams();
            params.append('taskId', this.editTaskForm.taskId);
            params.append('taskBeginTime', this.dataToUploadFormat(this.editTaskForm.time[0]));
            params.append('taskEndTime', this.dataToUploadFormat(this.editTaskForm.time[1]));
            const res = await this.$http.post("/task/update", params);
            if(res.data.code != 200) return this.$message.error('修改出错');
            this.$message.success('修改成功');
            location.reload();
        },
        // 控制日期格式输出
        dataToNormalFormat(data) {
            return data.substr(0, 4) + '-' + data.substr(5, 2) + '-' + data.substr(8, 2);
        },
        // 控制日期上传格式
        dataToUploadFormat(data) {
            return data.substr(0, 4) + '_' + data.substr(5, 2) + '_' + data.substr(8, 2) + '_00_00';
        },
        // 打包下载全部文件
        async downloadAll(taskId) {
            let params = new URLSearchParams();
            params.append('taskId', taskId);
            // params.append('userId', userId);
            const resp = await this.$http.post('/file/download/msg', params);
            // console.log(resp);
            let filename = resp.data.data;
            this.$http.post('/file/package/download', params, {responseType: 'arraybuffer'}).then(res => {
                console.log(res);
                fileDownload(res.data, 'files.zip');
            })
        },
        // 下载单人文件
        async downloadById(taskId, userId) {
            let params = new URLSearchParams();
            params.append("taskId", taskId);
            params.append('userId', userId);
            const res = await this.$http.post("/file/download", params);
            // console.log(res);
            const uuid = res.data.data;

            let a = document.createElement("a");
            a.href =
                `${this.$store.state.downloadURL}` +
                uuid;
            console.log(a.href);
            document.body.appendChild(a);
            a.click(); //下载
            URL.revokeObjectURL(a.href); // 释放URL 对象
            document.body.removeChild(a); // 删除 a 标签
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
</style>