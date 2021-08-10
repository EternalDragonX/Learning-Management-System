<template>
  <div class="QDMS-templat-div">
    <a-page-header
      class="QDMS-page-header"
      title="Browse All Instructor"
      @back="() => $router.go(-1)"
    >
    </a-page-header>

    <a-tabs class="QDMS-tabs" default-active-key="1">
      <a-tab-pane key="1" tab="Upload Current Insturctor Excel Files">
        <a-row :gutter="24">
          <a-col :span="18" :style="{ marginBottom: '24px' }">
            <a-card title="Upload Instructor Excel Files">
              <a-form-model
                ref="uploadRuleForm"
                :model="uploadForm"
                :rules="uploadFormRule"
                :label-col="{ span: 6 }"
                :wrapper-col="{ span: 12 }"
              >
                <a-form-model-item label="Upload Excel File" prop="ins_excel">
                  <a-upload
                    :before-upload="QDMSI_accessoryUpload"
                    list-type="picture"
                    :show-upload-list="false"
                  >
                    <a-button>
                      <a-icon type="upload" /> Select Attachment
                    </a-button>
                    <span>（Drag the attachment to change the order）</span>
                  </a-upload>
                  <draggable
                    :list="selectedAttachmentForm.ins_excel"
                    class="upload-list"
                    animation="300"
                  >
                    <div
                      v-for="element in selectedAttachmentForm.ins_excel"
                      :key="element.name"
                      class="element"
                    >
                      <a-icon class="file" type="file" />
                      {{ element.name }}
                      <a-icon
                        class="delete"
                        type="delete"
                        v-on:click="QDMSI_accessoryRemove(element)"
                      />
                    </div>
                  </draggable>
                </a-form-model-item>
              </a-form-model>
            </a-card>
          </a-col>
        </a-row>
      </a-tab-pane>
      <a-tab-pane key="2" tab="Search Instructor">
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
      <a-tab-pane key="3" tab="Create Instructor">
        <a-spin :spinning="instructorFormLoadingStatus" tip="Loading">
          <a-form-model
            ref="instructorRuleForm"
            :model="instructorForm"
            :rules="instructorFormRule"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 12 }"
          >
            <a-divider>Create New Instructor</a-divider>
            <a-form-model-item label="Title" prop="title">
              <a-select
                mode="multiple"
                style="width: 100%"
                :default-value="[{ key: 3, name: 'Professor' }]"
                placeholder="Please select"
                @change="
                  (value) => {
                    this.instructorForm.titleSelectionOption = value;
                  }
                "
              >
                <a-select-option
                  v-for="item in this.title_listData"
                  :value="item"
                  :key="item"
                >
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>

            <a-form-model-item label="First Name" prop="first_name">
              <a-input v-model="instructorForm.first_name" />
            </a-form-model-item>

            <a-form-model-item label="Last Name" prop="last_name">
              <a-input v-model="instructorForm.last_name" />
            </a-form-model-item>

            <a-form-model-item label="Email" prop="email">
              <a-input v-model="instructorForm.email" />
            </a-form-model-item>

            <a-form-model-item label="FTE" prop="FTE">
              <a-input v-model="instructorForm.FTE" />
            </a-form-model-item>

            <a-form-model-item label="FTE Status" prop="FTE_status">
              <a-select
                mode="multiple"
                style="width: 100%"
                :default-value="[{ key: 3, name: 'Professor' }]"
                placeholder="Please select"
                @change="
                  (value) => {
                    this.instructorForm.FTE_statusSelectionOption = value;
                  }
                "
              >
                <a-select-option
                  v-for="item in this.FTE_s_listData"
                  :value="item"
                  :key="item"
                >
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>

            <a-form-model-item
              label="Instructor Status"
              prop="instructor_status"
            >
              <a-select
                mode="multiple"
                style="width: 100%"
                :default-value="[{ key: 3, name: 'Tenured' }]"
                placeholder="Please select"
                @change="
                  (value) => {
                    this.instructorForm.instructorStatusSelectionOption = value;
                  }
                "
              >
                <a-select-option
                  v-for="item in this.instructor_status_listData"
                  :value="item"
                  :key="item"
                >
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>

            <a-form-model-item label="Years of Experience" prop="year_exp">
              <a-input v-model="instructorForm.year_exp" />
            </a-form-model-item>

            <a-form-model-item
              label="Current Working Status"
              prop="c_working_status"
            >
              <a-select
                mode="multiple"
                style="width: 100%"
                :default-value="[{ key: 3, name: 'Professor' }]"
                placeholder="Please select"
                @change="
                  (value) => {
                    this.instructorForm.c_working_s_SelectionOption = value;
                  }
                "
              >
                <a-select-option
                  v-for="item in this.c_working_s_listData"
                  :value="item"
                  :key="item"
                >
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>

            <a-form-model-item label="Avaliable Term" prop="avaliable_term">
              <a-select
                mode="multiple"
                style="width: 100%"
                :default-value="[{ key: 3, name: 'Professor' }]"
                placeholder="Please select"
                @change="
                  (value) => {
                    this.instructorForm.avaliable_term_SelectionOption = value;
                  }
                "
              >
                <a-select-option
                  v-for="item in this.avaliable_term_listData"
                  :value="item"
                  :key="item"
                >
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-model-item>

            <a-form-model-item
              label="Current Teaching Load"
              prop="teaching_load"
            >
              <a-input v-model="instructorForm.teaching_load" />
            </a-form-model-item>

            <a-form-model-item label="Current Admin Load" prop="admin_load">
              <a-input v-model="instructorForm.admin_load" />
            </a-form-model-item>

            <a-form-model-item label="C Forward Load" prop="cfwd_load">
              <a-input v-model="instructorForm.cfwd_load" />
            </a-form-model-item>

            <a-form-model-item label="Total Load" prop="total_load">
              <a-input v-model="instructorForm.total_load" />
            </a-form-model-item>

            <a-form-model-item label="Belong Committee" prop="belong_cttee">
              <a-input v-model="instructorForm.belong_cttee" />
            </a-form-model-item>

            <a-form-model-item label="Comittee Role" prop="cttee_role">
              <a-input v-model="instructorForm.cttee_role" />
            </a-form-model-item>

            <a-form-model-item
              style="text-align: center"
              :wrapper-col="{ span: 12, offset: 6 }"
            >
              <a-button
                size="large"
                type="primary"
                :loading="createButtonLoadingStatus"
                @click="createBtn_onClick()"
                >Create</a-button
              >
            </a-form-model-item>
          </a-form-model>
        </a-spin>
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
import API_Admin from "@/api/api_Admin";
const formColumnData = [
  {
    title: "Instructor List",
  },
];
export default {
  name: "InstructorManagment",
  data() {
    return {
        //Upload Excel data
      uploadForm: {
        ins_excel: [],
      },
      uploadFormRule: {},
      selectedAttachmentForm: {
        ins_excel: [],
      },
      //Search list Data
      searchRegion: {
        inputN: "",
      },
      searchRegionRecord: {
        inputN: "",
      },
      formColumnData: formColumnData,
      formRowData: [],
     
      formPaginationRegion: {
        currentPage: 1,
        page_size: 10,
        pageSum: 0,
      },
      searchListloadingStatus: false,
      //Create instructor data
      instructorForm: {
        title: "",
        first_name: "",
        last_name: "",
        email: "",
        FTE: "",
        FTE_status: "",
        instructor_status: "",
        year_exp: "",
        c_working_status: "",
        avaliable_term: "",
        teaching_load: "",
        admin_load: "",
        cfwd_load: "",
        total_load: "",
        belong_cttee: "",
        cttee_role: "",
      },
      instructorFormRule: {
        first_name: [{ required: true, trigger: "blur" }],
        last_name: [{ required: true, trigger: "blur" }],
        email: [{ required: true, trigger: "blur" }],
        FTE: [{ required: true, trigger: "blur" }],
        FTE_status: [{ required: true, trigger: "blur" }],
        instructor_status: [{ required: true, trigger: "blur" }],
        year_exp: [{ required: true, trigger: "blur" }],
        c_working_status: [{ required: true, trigger: "blur" }],
        avaliable_term: [{ required: true, trigger: "blur" }],
        teaching_load: [{ required: true, trigger: "blur" }],
        admin_load: [{ required: true, trigger: "blur" }],
        cfwd_load: [{ required: true, trigger: "blur" }],
        total_load: [{ required: true, trigger: "blur" }],
      },
      instructorFormLoadingStatus: false,
       createButtonLoadingStatus: false,
    };
  },
  computed: {},
  methods: {
    QDMSI_accessoryUpload(file) {},
    QDMSI_accessoryRemove(file) {},
    async createBtn_onClick() {},
    table_rowClick(record, index) {
      return {
        on: {
          click: () => {
            this.$router.push({
              path: "/Admin/InstructorDetail",
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

      API_Admin.BrowseInstructorList(Json)
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