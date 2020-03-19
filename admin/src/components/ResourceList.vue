<template>
  <div>
    <avue-crud
      v-if="option.column"
      v-model="model"
      :data="data.data"
      :option="option"
      :table-loading="loading"
      :page.sync="page"
      @row-save="create"
      @row-update="update"
      @row-del="remove"
      @on-load="loadData"
      @current-change="changeCurrentPage"
      @search-change="search"
      :upload-after="uploadAfter"
    >
      <!-- <template slot="searchMenu"></template> -->
      <template slot="file" slot-scope="scope">
        <video :src="scope.row.file" width="100%"></video>
      </template>
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

  loading: boolean = true;

  page: any = {
    total: 0,
    currentPage: 1,
    pageSize: 10
    // pageSizes: [10, 20, 50, 100]
  };

  query: any = {
    page: 1,
    limit: 0
  };

  async loadData() {
    this.query.page = this.page.currentPage;
    this.query.limit = this.page.pageSize;
    await this.fetchResourceList();
  }

  // changePageSize() {
  //   this.page.currentPage = 1;
  //   this.query.limit = this.page.pageSize;
  //   this.fetchResourceList();
  // }

  changeCurrentPage() {
    this.query.page = this.page.currentPage;
    this.fetchResourceList();
  }

  async search(params, done) {
    const key: any = Object.keys(params).pop();
    const where = { [key]: { $regex: params[key] } };
    this.query.where = where;
    await this.fetchResourceList();
    done();
  }

  async uploadAfter(res, done, loading) {
    done();
    this.$message.success("上传完成");
  }

  async create(row, done) {
    const data = JSON.parse(JSON.stringify(row));
    Reflect.deleteProperty(data, "$course");
    await this.$http.post(`/${this.resource}`, data);
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
    this.loading = false;
  }

  async fetchResourceList() {
    const res = await this.$http.get(`/${this.resource}`, {
      params: {
        query: this.query
      }
    });
    this.data = res.data;
    this.page.total = res.data.total;
  }

  created() {
    this.fetchOption();
  }
}
</script>

<style></style>
