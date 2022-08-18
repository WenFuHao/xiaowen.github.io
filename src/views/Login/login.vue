<template>
  <div class="box">
    <vue-particles
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="100"
      shapeType="polygon"
      :particleSize="2"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
      id="particles-js"
    >
    </vue-particles>

    <el-form
      :model="form"
      status-icon
      :rules="rules"
      ref="form"
      label-width="100px"
      class="login-container"
    >
      <h1 class="login_title">后台管理系统</h1>
      <el-form-item
        label="用户名"
        label-width="80px"
        prop="username"
        class="username"
      >
        <el-input
          type="input"
          v-model="form.username"
          auto-complete="off"
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>

      <el-form-item label="密码" label-width="80px" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          auto-complete="off"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>

      <el-form-item class="login_submit">
        <el-button type="primary" @click="login" class="login_submit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getMenu } from '../../../api/data.js'
export default {
  name: 'login',
  data() {
    return {
      form: {},
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            message: '用户名长度不能小于3位',
            trigger: 'blur',
          },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    }
  },
  methods: {
    login() {
      getMenu(this.form).then(({ data: res }) => {
        if (res.code === 20000) {
          this.$store.commit('clearMenu')
          this.$store.commit('setMenu', res.data.menu)
          this.$store.commit('setToken', res.data.token)
          this.$store.commit('addMenu', this.$router)
          this.$router.push({ name: 'home' })
        } else {
          this.$message.warning(res.data.message)
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.login-container {
  background-color: rgb(255, 255, 255);
  border-radius: 15px;
  background-clip: padding-box;
  margin: auto;
  width: 450px;
  padding: 35px 35px 15px 35px;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #fff;
  position: relative;
  top: 200px;
}
.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
  font-weight: bolder;
  font-size: 24px;
}
.login_submit {
  //   margin: 10px 30px;
  width: 360px;
  margin-left: -40px;
}

#particles-js {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: black;
}
.box {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
