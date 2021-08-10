<template>
  <div class="QDMS-template-div">
    <a-page-header
      class="QDMS-page-header"
      title="InstructorDetail"
      @back="() => $router.go(-1)"
    >
    </a-page-header>

    <div class="QDMS-box">
      <a-spin :spinning="instructorFormLoadingStatus" tip="Loading">
        <a-form-model
          ref="instructorRuleForm"
          :model="instructorForm"
          :rules="instructorFormRule"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-divider>Manage Instructor Profile</a-divider>
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

          <a-form-model-item label="Instructor Status" prop="instructor_status">
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

          <a-form-model-item label="Current Teaching Load" prop="teaching_load">
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

        </a-form-model>
      </a-spin>
    </div>
  </div>
</template>

<style scoped>
.QDMS-template-div {
  height: 100%;
}

.QDMS-page-header {
  background: #fff;
}

.QDMS-box {
  margin-top: 20px;
  margin-bottom: 30px;
  padding: 10px 20px;
  background: #fff;
  min-height: 60%;
}

.QDMS-box .upload-list .eye {
  float: right;
  margin-top: 13px;
  margin-right: 10px;
}

.QDMS-box .upload-list .delete {
  float: right;
  margin-top: 13px;
}
</style>

<script>
import API_Admin from "@/api/api_NormalUser";
import draggable from "vuedraggable";
import { TreeSelect } from "ant-design-vue";
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

export default {
  name: "InstructorDetail",
  components: {
    draggable,
  },
  data() {
    return {
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
  mounted() {
    this.$options.methods.loadinstructorFormDetail(this);
    this.$options.methods.loadinstructorFormSubjectOptions(this);
  },
  created() {
    this.instructorForm.user_id = this.$route.query.user_id;
  },
  methods: {},
};
</script>