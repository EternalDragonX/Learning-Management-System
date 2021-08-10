<template>
  <div class="QDMS-templat-div">
    <a-page-header
      class="QDMS-page-header"
      title="Browse All Instructor"
      @back="() => $router.go(-1)"
    >
    </a-page-header>

    <a-tabs class="QDMS-tabs" default-active-key="1">
      <a-tab-pane key="1" tab="Search Instructor">
        <a-form class="QDMSI-search-form" layout="inline">
          <a-row type="flex" align="middle">
            <a-col :md="9" :sm="24">
              <div>Search Instructor</div>
              <a-form-model-item>
                <a-input v-model="searchRegion.inputN"></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :md="5" :sm="5">
              <span :style="{ float: 'right' }">
                <a-button type="primary" @click="searchButton_onClick"
                  >Search</a-button
                >
              </span>
            </a-col>
          </a-row>
        </a-form>
        <a-form-model class="QDMS-table-form" layout="inline">
          <a-row>
            <a-col :span="24">
              <a-table
                size="middle"
                :pagination="false"
                :bordered="true"
                :loading="searchListLoadingStatus"
                :columns="formColumnData"
                :data-source="formRowData"
                :row-key="(formRowData) => formRowData.key"
                :customRow="table_rowClick"
              >
              </a-table>
            </a-col>
            <a-col :span="24">
              <a-pagination
                class="QDMS-pagination"
                v-model="formPaginationRegion.currentPage"
                :total="formPaginationRegion.pageSum"
                :show-total="(total) => `There are  ${total} records`"
                :page-size="formPaginationRegion.page_size"
                @change="tablePagination_onChange"
              ></a-pagination>
            </a-col>
          </a-row>
        </a-form-model>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<style lang='less'>
.ant-form-horizontal {
  .ant-form-item {
    .ant-input-number {
      width: 100%;
    }
  }
}
</style>

<style lang='less' scoped>
.QDMS-template-div {
  height: 100%;
}

.QDMS-tabs {
  padding: 10px 20px;
  background: #fff;
  min-height: 80%;
}

.QDMS-button-group {
  margin-bottom: 12px;
}

.QDMS-add-custom-course-modal {
  .steps {
    padding: 0 0 40px 0;
  }

  .card {
    margin-bottom: 12px;
  }

  .form {
    max-width: 550px;
    margin: 0 auto 0;
  }
}

.QDMS-table-title {
  padding: 5px 15px 15px 15px;
  .title {
    font-size: 17px;
    line-height: 2;
  }
  .radio-group {
    float: right;
    padding-right: 20px;
  }
}

.QDMS-events-list {
  .course-event {
    background-color: #3788d8;
    color: #fff;
    font-weight: bold;
    border-radius: 3px;
    padding: 0 5px;
    margin: 7px 0;
  }
}
</style>

<script>
import API_NormalUser from "@/api/api_NormalUser";
const formColumnData = [
  {
    title: "Instructor List",
  },
];
export default {
  name: "InstructorManagment",
  data() {
   return {

      //Search list Data
      searchRegion: {
        inputN: "",
      },
      searchRegionRecord: {
        inputN: "",
      },
      formColumnData: formColumnData,
      formRowData: [],
      createButtonLoadingStatus: false,
      formPaginationRegion: {
        currentPage: 1,
        page_size: 10,
        pageSum: 0,
      },
      searchListloadingStatus: false,
    };
  },
  computed: {},
  methods: {
    table_rowClick(record, index) {
      return {
        on: {
          click: () => {
            this.$router.push({
              path: "/Normal/NormalInstructorDetail",
              query: { user_id: record.user_id },
            });
          },
        },
      };
    },
    tablePagination_onChange(page, pageSize) {
      var Json = {};

      Json.name = this.formSearchRegionRecord.name;
      Json.page_number = page;
      // Json.subjectSelectionOptionValue = this.formSearchRegionRecord.subjectSelectionOption;
      this.searchListloadingStatus = true;

      API_NormalUser.BrowseInstructorList(Json)
        .then((result) => {
          this.formPaginationRegion.pageSum = result.pageSum;
          this.formColumnData = result.columnData;
          this.formRowData = result.rowData;
        })
        .finally(() => {
          this.searchListloadingStatus = false;
        });
    },
  },
};
</script>