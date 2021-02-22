<template>
  <div class="about">
    <div class="head">
      <div></div>
      <div class="time">
        {{ timenum }}
      </div>
      <div class="qiz">
        <img src="/qizi.png" alt="" />
        <span>{{ qizinum }}</span>
      </div>
    </div>
    <div class="content">
      <div class="container">
        <div
          class="lei"
          v-for="(item, index) in list"
          :key="item.id"
          :style="{ background: item.flag ? 'red' : '' }"
        >
          <div
            class="zz"
            v-show="item.show"
            @click.left="dj(index)"
            @contextmenu.prevent="qz(index)"
            :style="{ background: item.show ? 'green' : '' }"
          >
            {{ item.tu }}
          </div>
          {{ item.count | pdcount }}
        </div>
      </div>
      <div class="eject" v-show="status" :style="status ?{'background-image': 'url(/background.gif)' }:{'background-image': 'url()'} ">
        <div class="successtj">
          <div class="successtop">
            <div v-if="success">
              恭喜您胜利了！
            </div>
            <div v-else>
              失败了，再来一局！
            </div>
          </div>
          <div class="successbottom">
            <button @click="algin">再来一局</button>
            <button @click="status = false">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getarr } from "../utils/api";
export default {
  name: "about",
  data() {
    return {
      list: [],
      dgArray: [],
      status: false,
      success: true,
      timenum: 0,
      qizinum: 0,
      qitu: "",
    };
  },
  created() {
    getarr().then((res) => {
      this.list = res.list;
      for (let i = 0; i <= 30; i++) {
        let n = this.random();
        this.list[n].flag = true;
      }
    });
    this.timeFn();
  },
  filters: {
    pdcount(val) {
      if (val == 0) {
        return "";
      } else {
        return val;
      }
    },
  },
  watch: {
    list: {
      handler(newval, oldval) {
        let num = 0;
        this.list.forEach((item) => {
          if (item.show) {
            num++;
          }
          if (num <= 30) {
            this.success = true;
          } else {
            this.success = false;
          }
        });
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    timeFn() {
      let n = 0;
      setInterval(() => {
        n++;
        if (n < 10) {
          n = "0" + n;
        }
        this.timenum = n;
      }, 1000);
    },
    algin() {
      this.$router.go(0);
    },
    random() {
      let num = parseInt(Math.random() * 448 - 1);
      return num;
    },
    dj(i) {
      // 如果是雷
      if (this.list[i].flag) {
        this.list[i].show = false;
        this.list.forEach((item) => {
          if (item.flag) {
            item.count = "雷";
            setTimeout(() => {
              item.show = false;
            }, 1000);
          }
        });
        this.status = true;
        this.success = false;
      } else {
        // 如果不是雷
        this.dgArray = [];
        this.list[i].show = false;
        this.ts(i);
      }
    },
    qz(i, e) {
      this.list[i].tu = "雷";
      let n = 0;
      this.list.forEach((item) => {
        if (item.tu == "雷") {
          n++;
          this.qizinum = n;
        }
      });
    },
    //数组扁平化的方法
    digui(arr, dgArray) {
      if (arr instanceof Array) {
        arr.forEach((item) => {
          if (item instanceof Array) {
            this.digui(item);
          } else {
            dgArray.push(item);
          }
        });
      }
      return dgArray;
    },
    //提示周围的方法
    ts(i) {
      // 判断是不是第一行
      if (i - 28 < 0) {
        // 判断是不是第一个
        if (i === 0) {
          let arr2 = JSON.parse(JSON.stringify(this.list)).splice(i, 2);
          let arr3 = JSON.parse(JSON.stringify(this.list)).splice(i + 28, 2);
          this.digui(arr2, this.dgArray);
          this.digui(arr3, this.dgArray);
          let n = 0;
          // console.log(this.dgArray);
          this.dgArray.forEach((item) => {
            if (item.flag) {
              n++;
              this.list[i].count = n;
              console.log(this.dgArray);
            }
          });
          return;
        } else if (i === 27) {
          let arr2 = JSON.parse(JSON.stringify(this.list)).splice(i - 1, 2);
          let arr3 = JSON.parse(JSON.stringify(this.list)).splice(i + 27, 2);
          this.digui(arr2, this.dgArray);
          this.digui(arr3, this.dgArray);
          console.log(this.dgArray);

          let n = 0;
          this.dgArray.forEach((item) => {
            if (item.flag) {
              n++;
              this.list[i].count = n;
            }
          });
          return;
        } else {
          let arr2 = JSON.parse(JSON.stringify(this.list)).splice(i - 1, 3);
          let arr3 = JSON.parse(JSON.stringify(this.list)).splice(i + 27, 3);
          this.digui(arr2, this.dgArray);
          this.digui(arr3, this.dgArray);
          console.log(this.dgArray);

          let n = 0;
          this.dgArray.forEach((item) => {
            if (item.flag) {
              n++;
              this.list[i].count = n;
            }
          });
          return;
        }
      }

      if ((i + 1) % 28 == 1) {
        let arr1 = JSON.parse(JSON.stringify(this.list)).splice(i - 28, 2);
        let arr2 = JSON.parse(JSON.stringify(this.list)).splice(i, 2);
        let arr3 = JSON.parse(JSON.stringify(this.list)).splice(i + 28, 2);
        this.digui(arr1, this.dgArray);
        this.digui(arr2, this.dgArray);
        this.digui(arr3, this.dgArray);
        console.log(this.dgArray);

        let n = 0;
        this.dgArray.forEach((item) => {
          if (item.flag) {
            n++;
            this.list[i].count = n;
          }
        });
        return;
      }
      if ((i + 1) % 28 == 0) {
        let arr1 = JSON.parse(JSON.stringify(this.list)).splice(i - 29, 2);
        let arr2 = JSON.parse(JSON.stringify(this.list)).splice(i - 1, 2);
        let arr3 = JSON.parse(JSON.stringify(this.list)).splice(i + 27, 2);
        this.digui(arr1, this.dgArray);
        this.digui(arr2, this.dgArray);
        this.digui(arr3, this.dgArray);
        console.log(this.dgArray);

        let n = 0;
        this.dgArray.forEach((item) => {
          if (item.flag) {
            n++;
            this.list[i].count = n;
          }
        });
        return;
      }
      let arr1 = JSON.parse(JSON.stringify(this.list)).splice(i - 29, 3);
      let arr2 = JSON.parse(JSON.stringify(this.list)).splice(i - 1, 3);
      let arr3 = JSON.parse(JSON.stringify(this.list)).splice(i + 27, 3);
      this.digui(arr1, this.dgArray);
      this.digui(arr2, this.dgArray);
      this.digui(arr3, this.dgArray);
      console.log(this.dgArray);
      let n = 0;
      this.dgArray.forEach((item) => {
        if (item.flag) {
          n++;
          this.list[i].count = n;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.about {
  width: 100%;
  height: 100%;
}
.content {
  width: 1402px;
  height: 800px;
  border: 1px solid black;
  margin: 0px auto;
  position: relative;
}
.head {
  width: 1402px;
  height: 60px;
  background: brown;
  border: 1px solid black;
  border-bottom: none;
  margin: 30px auto 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .time {
    width: 100px;
    height: 60px;
    line-height: 60px;
    border: 1px;
    background-color: black;
    color: white;
    text-align: center;
    font-size: 28px;
    font-weight: 900;
  }
  .qiz {
    width: 100px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 26px;
    font-weight: 800;
    img {
      width: 40px;
      height: 40px;
    }
  }
}
.eject {
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: 0.3);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  .successtj {
    width: 300px;
    height: 200px;
    background: white;
    border: 1px solid black;
    .successtop {
      width: 100%;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }
    .successbottom {
      width: 100%;
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  }
}
.header {
  width: 40px;
  height: 100%;
  background-color: teal;
}
.container {
  display: flex;
  flex-wrap: wrap;
}
.lei {
  width: 50px;
  height: 50px;
  border: 1px solid black;
  text-align: center;
  line-height: 50px;
  position: relative;
  font-weight: 800;
}
.zz {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  cursor: pointer;
  font-size: 26px;
  font-weight: 800;
}
</style>
