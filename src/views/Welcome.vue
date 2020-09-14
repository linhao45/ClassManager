<template>
    <div class="img_container">
        <div class="word_container">
            <div class="words">
                <br />
                <br />
                <br />
                <div style="text-align: right;">
                    <p>StarkFarm创新实验室</p>
                    <p>前端：吴泽华</p>
                    <p>后端：马世龙<br />陈媛媛<br />杜雅琴</p>
                    <p>运营：林<span></span>昊</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {},
};
</script>

<style lang="less" scoped>
.img_container {
    width: 100%;
    height: 100%;
    background-image: url(http://picture.youaremine.vip/yesterday.php);
}
.word_container {
    width: 100%-20px;
    height: 600px;
    margin: auto;
    color: white;
    font-size: 96px;
    text-align: center;
    letter-spacing: 16px;
}
.words {
    padding-top: 50px;
    font-family: PingFangSC-Medium, sans-serif;
}
.words p {
    font-size: 20px;
    letter-spacing: 0px;
}
.words span {
    margin: 10px;
}
</style>