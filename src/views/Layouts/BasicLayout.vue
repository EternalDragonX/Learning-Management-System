<template>
  <a-layout class="layout">
    <a-layout-header class="header">
      <span>Queen's University Drama & Music Teaching Assignment Management System</span>
      <a-dropdown placement="bottomRight">
        <span class="QDM-account-avatar">
          <a-avatar
            class="user-avatar"
            src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
            size="small"
          />
          <span class="user-name">{{ this.$store.state.FirstName + " " + this.$store.state.LastName}}</span>
        </span>
        <a-menu slot="overlay">
          <a-menu-item key="logout" @click="logout_onClick">
            <a-icon type="logout" />Log out
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="270" style="background: #fff;">
        <a-menu
          mode="inline"
          :default-selected-keys="[this.$router.currentRoute.fullPath]"
          :default-open-keys="[this.$router.history.current.matched[1].path]"
          :style="{ height: '100%', borderRight: 0 }"
        >
          <a-sub-menu
            v-for="menus_items in newMenus"
            :key="menus_items.path"
            @click="subMenu_onClick"
          >
            <span slot="title">
              <a-icon :type="menus_items.meta.icon" />
              {{ menus_items.meta.title }}
            </span>
            <a-menu-item v-for="children_items in menus_items.children" :key="children_items.path">
              <a-icon :type="children_items.meta.icon" />
              <span>{{ children_items.meta.title }}</span>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item
            v-for="(breadItem,idx) in this.$route.matched.filter(item => item.meta.title)"
            :key="idx"
          >{{breadItem.meta.title}}</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content>
          <router-view />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  name: "BasicLayout",
  data() {
    return {
      menus: [],
    };
  },
  computed: {
    newMenus() {
      for (var i = 0; i < this.menus.length; i++) {
        for (var t = 0; t < this.menus[i].children.length; t++) {
          if (this.menus[i].children[t].meta.hidden) {
            this.menus[i].children.splice(t, 1);
            t = t - 1;
          }
        }
      }

      return this.menus;
    },
  },
  created() {
    const routes = this.$router.options.routes.find(
      (item) => item.path === "/"
    );

    this.menus = routes.children;
  },
  mounted() {

  },
  methods: {
    subMenu_onClick(event) {
      this.$router.push(event.key);
    },
    logout_onClick(event) {
      this.$store.commit("SET_UserID", null);
      this.$store.commit("SET_FirstName", null);
      this.$store.commit("SET_LastName",null);
      this.$store.commit("SET_Token", null);
      this.$router.push({
        path: "/Login",
      });
    },
  },
};
</script>

<style scoped>
.layout {
  height: 100%;
}
.header {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: 1px;
}

.header .logo {
  width: 30px;
  margin-right: 10px;
}

.header .QDM-account-avatar {
  padding: 0px 20px;
  float: right;
}

.header .QDM-account-avatar:hover {
  background: #1890ff;
  -webkit-transition: all 0.2s linear;
  -moz-transition: all 0.2s linear;
  -o-transition: all 0.2s linear;
  transition: all 0.2s linear;
  cursor: pointer;
}

.header .QDM-account-avatar .user-avatar {
  margin-right: 8px;
}

.header .QDM-account-avatar .user-name {
  font-size: 14px;
}

.total {
  color: red;
}
</style>