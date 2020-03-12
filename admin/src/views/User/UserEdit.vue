<template>
  <div>
    <h3>{{isNew ? '新建' : '编辑'}}用户</h3>
    <el-form :model="data" ref="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="data.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="data.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit" @click.native.prevent="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class UserEdit extends Vue {
  @Prop() id?: string;

  data: any = {
    username: "",
    password: ""
  };

  async save() {
    const method = this.isNew ? "post" : `put`;
    const url = this.isNew ? "/users" : `/users/${this.id}`;
    await this.$http[method](url, this.data);
    this.$router.push("/users/list");
  }

  async fetchOne() {
    const res = await this.$http.get(`/users/${this.id}`);
    this.data = res.data;
  }

  created() {
    this.id && this.fetchOne();
  }

  get isNew() {
    return !this.id;
  }
}
</script>