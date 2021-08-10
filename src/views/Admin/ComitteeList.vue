<template>
<div class="theL-template-div">
  <a-form class="theL-search-form" layout="inline">
    <a-row type="flex" align="middle">
      <a-col :md="18" :sm="18">
        <div>List of Current Committees that teachers sit on</div>
      </a-col>
      <a-col :md="5" :sm="5">
          <span :style="{ float: 'right' }">
            <a-button type="primary" @click="searchButton_onClick"
            >Search</a-button
            >
            <a-button
                style="margin-left: 13px"
                type="primary"
                @click="createCommitteeButton_onCLick"
            >Create</a-button
            >
          </span>
      </a-col>
    </a-row>
  </a-form>

  <a-form-model class="theL-table-form">
    <a-row>
      <a-col :span="24">
        <a-table
            size="middle"
            :pagination="false"
            :bordered="true"
            :loading="loadingStatus"
            :columns="formColumnData"
            :data-source="formRowData"
            :row-key="(formRowData) => formRowData.key"
            :customRow="table_rowClick"
        ></a-table>
      </a-col>
      <a-col :span="24">
        <a-pagination
            class="theL-pagination"
            v-model="formPaginationRegion.currentPage"
            :total="formPaginationRegion.pageSum"
            :show-total="(total) => `There are  ${total} records`"
            :page-size="formPaginationRegion.page_size"
            @change="tablePagination_onChange"
        ></a-pagination>
      </a-col>
    </a-row>
  </a-form-model>

</div>
</template>

<script>
const formColumnData = [
  {
    title: "Committee List",
  },
];

export default {
  name: "AllCommittee",
  data() {
    return {
      page_number: "",
      formColumnData: formColumnData,
      formRowData: [],
      loadingStatus: false,
      formPaginationRegion: {
        currentPage: 1,
        page_size: 10,
        pageSum: 0,
      },
    };
  },
  computed: {},
  methods: {
    // searchButton_onClick() {
    //   this.loadingStatus = true;
    //   var Json = {};
    //   Json.page_number = 1;
    //
    //   API_Admin.BrowseSubjectList(Json)
    //       .then((result) => {
    //         this.formPaginationRegion.pageSum = result.pageSum;
    //         this.formColumnData = result.columnData;
    //         this.formRowData = result.rowData;
    //       })
    //       .finally(() => {
    //         this.loadingStatus = false;
    //       });
    // },
    // tablePagination_onChange(page, pageSize) {
    //   var Json = {};
    //
    //   Json.page_number = page;
    //
    //   this.loadingStatus = true;
    //
    //   API_Admin.BrowseSubjectList(Json)
    //       .then((result) => {
    //         this.formPaginationRegion.pageSum = result.pageSum;
    //         this.formColumnData = result.columnData;
    //         this.formRowData = result.rowData;
    //       })
    //       .finally(() => {
    //         this.loadingStatus = false;
    //       });
    // },

     createSubjectButton_onCLick() {
       this.$router.push({ path: "/Admin/CreateCommittee" });
     }
    // table_rowClick(record, index) {
    //   return {
    //     on: {
    //       click: () => {
    //         this.$router.push({
    //           path: "/Admin/ModifySubject",
    //           query: { subject_id: record.subjectID },
    //         });
    //       },
    //     },
    //   };
    // },
  },
};
</script>

<style scoped>
.theL-template-div {
  height: 100%;
}

.theL-search-form {
  padding: 18px 24px;
  background: #fff;
}

.theL-table-form {
  margin-top: 18px;
  margin-bottom: 20px;
  padding: 18px 24px;
  background: #fff;
  min-height: -webkit-calc(98% - 76px);
}

.theL-table-form .theL-pagination {
  padding: 20px 0px;
  float: right;
}
</style>