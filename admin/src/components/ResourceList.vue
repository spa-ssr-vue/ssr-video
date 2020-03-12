<template>
  <div>
    <avue-crud
      v-if="option.column"
      v-model="model"
      :data="data"
      :option="option"
      @row-save="create"
      @row-update="update"
      @row-del="remove"
    ></avue-crud>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class ResourceList extends Vue {
  @Prop() resource?: string;

  option: any = {};
  data: any = [];
  model: any = {};

  async create(row, done) {
    await this.$http.post(`/${this.resource}`, row);
    this.$message.success("创建完成");
    this.fetchResourceList();
    done();
  }

  async update(row, index, done, loading) {
    const data = JSON.parse(JSON.stringify(row));
    Reflect.deleteProperty(data, "$index");
    await this.$http.put(`/${this.resource}/${row._id}`, data);
    this.$message.success("更新完成");
    this.fetchResourceList();
    done();
    global.console.log(index);
    global.console.log(loading);
  }

  async remove(row, index) {
    try {
      await this.$confirm("是否删除数据？");
    } catch (e) {
      return;
    }
    await this.$http.delete(`/${this.resource}/${row._id}`);
    this.$message.success("删除完成");
    this.fetchResourceList();
    global.console.log(index);
  }

  async fetchOption() {
    const res = await this.$http.get(`/${this.resource}/option`);
    this.option = res.data;
  }

  async fetchResourceList() {
    const res = await this.$http.get(`/${this.resource}`);
    this.data = res.data.data;
  }

  created() {
    this.fetchOption();
    this.fetchResourceList();
  }
}
</script>

<style scoped>
</style>