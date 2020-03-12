<template>
  <div>
    <h3>用户列表</h3>
    <h3>
      <el-button type="primary" size="small" @click="$router.push('/users/create')">
        <i class="el-icon-plus"></i>创建
      </el-button>
    </h3>
    <el-table :data="data" border stripe>
      <el-table-column v-for="(field, key) in fields" :prop="key" :key="key" :label="field.label"></el-table-column>
      <el-table-column label="操作" width="200px">
        <template v-slot="{row}">
          <el-button type="primary" size="small" @click="$router.push(`/users/edit/${row._id}`)">编辑</el-button>
          <el-button type="danger" size="small" @click="remove(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class UserList extends Vue {
  data: any = [];
  fields: any = {
    _id: { label: "ID" },
    username: { label: "用户名" },
    password: { label: "密码" }
  };

  async remove(row: any) {
    try {
      await this.$confirm("请确认是否彻底删除?");
    } catch (e) {
      return;
    }
    await this.$http.delete(`/users/${row._id}`);
    this.fetchUserList();
  }

  async fetchUserList() {
    const res = await this.$http.get("/users");
    this.data = res.data.data;
  }

  created() {
    this.fetchUserList();
  }
}
</script>

<style scoped>
</style>