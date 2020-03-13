<template>
  <div>
    <avue-crud
      v-if="option.column"
      v-model="model"
      :data="data.data"
      :option="option"
      :page.sync="page"
      @row-save="create"
      @row-update="update"
      @row-del="remove"
      @on-load="onLoad"
      @size-change="sizeChange"
      @current-change="currentChange"
      @search-change="searchChange"
      :upload-after="uploadAfter"
    >
      <template slot="searchMenu"></template>
    </avue-crud>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class ResourceList extends Vue {
  @Prop() resource?: string;

  option: any = {};
  data: any = {};
  model: any = {};

  page: any = {
    pageSize: 5,
    pageSizes: [5, 10, 15],
    total: 0
  };

  query: any = {
    page: 1,
    limit: 0
  };

  async onLoad() {
    await this.fetchResourceList();
    this.page.total = this.data.total;
    this.page.currentPage = this.data.page;
  }

  sizeChange(val) {
    this.page.currentPage = 1;
    this.query.page = this.page.currentPage;
    this.query.limit = this.page.pageSize = val;
    this.fetchResourceList();
  }
  currentChange(val) {
    this.page.currentPage = val;
    this.query.page = this.page.currentPage;
    this.fetchResourceList();
  }

  searchChange(params, done) {
    const key: any = Object.keys(params).pop();
    const where = { [key]: { $regex: params[key] } };
    this.query.where = where;
    this.fetchResourceList();
    done();
  }

  async uploadAfter(res, done, loading) {
    done();
    this.$message.success("上传后的方法");
  }

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
  }

  async fetchOption() {
    const res = await this.$http.get(`/${this.resource}/option`);
    this.option = res.data;
  }

  async fetchResourceList() {
    const res = await this.$http.get(`/${this.resource}`, {
      params: {
        query: this.query
      }
    });
    this.data = res.data;
  }

  created() {
    this.fetchOption();
  }
}
</script>

<style>
</style>