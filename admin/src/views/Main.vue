<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        router
        mode="verticle"
        :default-active="$route.path"
        :default-openeds="['1']"
        style="height: 100vh"
      >
        <el-submenu
          v-for="(item, index) of menu.items"
          :index="`${index} + 1`"
          :key="`item${index}`"
        >
          <template slot="title">{{item.title}}</template>
          <el-menu-item
            v-for="(subItem, subIndex) of item.items"
            :key="`subItem${subIndex}`"
            :index="subItem.path"
          >{{subItem.title}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <router-link tag="h2" to="/">Video网站 - 后台管理系统界面</router-link>
      </el-header>
      <el-main>
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class Main extends Vue {
  message: string = "main";
  menu = {
    items: [
      {
        title: "内容管理",
        items: [
          {
            title: "课程管理",
            path: "/courses/list"
          },
          {
            title: "课时管理",
            path: "/episodes/list"
          }
        ]
      },
      {
        title: "运营管理",
        items: [
          {
            title: "用户管理",
            path: "/users/list"
          }
        ]
      }
    ]
  };
}
</script>

<style lang="scss" scoped></style>
