<template>
  <div class="theL-template-div">
    <a-form class="theL-search-form">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="List of Backups">
          <a-row class="synopsisRow">
            <a-col :span="8">
              <a-select
                label-in-value
                :default-value="{ key: '1' }"
                style="width: 250px"
                @change="handleChange"
              >
                <a-select-option value="1">
                  Sort by: Date: Newest First
                </a-select-option>
                <a-select-option value="2">
                  Sort by: Date: Oldest First
                </a-select-option>
                <a-select-option value="3">
                  Sort by: Backup Size: Large to Small
                </a-select-option>
                <a-select-option value="4">
                  Sort by: Backup Size: Large to Small
                </a-select-option>
              </a-select>
            </a-col>

            <a-popconfirm
              title="Are you sure?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="confirm"
            >
              <a-button type="primary"> Backup Now?</a-button>
            </a-popconfirm>
          </a-row>

          <a-table bordered :columns="columns" :data-source="data">
            <template slot="download" slot-scope="text, record">
              <a>Download</a>
            </template>

            <template slot="delete">
              <a-popconfirm
                title="Are you sure?"
                ok-text="Yes"
                cancel-text="No"
              >
                <a>Delete</a>
              </a-popconfirm>
            </template>
          </a-table>
        </a-tab-pane>

        <a-tab-pane key="2" tab="Automatic Backup">
          <a-form-model
            :model="form"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <div class="heading">Automatic Backup</div>

            <a-form-model-item>
              <a-checkbox :defaultChecked="true" @change="onChange">
                Run backup on a schedule (recommended)
              </a-checkbox>
            </a-form-model-item>

            <a-form-model-item label="How often:">
              <a-select
                label-in-value
                :default-value="{ key: '1' }"
                style="width: 250px"
                @change="handleChange"
              >
                <a-select-option value="1"> Daily </a-select-option>
                <a-select-option value="2"> Weekly </a-select-option>
                <a-select-option value="3"> Monthly </a-select-option>
                <a-select-option value="4"> Yearly </a-select-option>
              </a-select>
            </a-form-model-item>

            <a-form-model-item label="What day">
              <a-select
                label-in-value
                :default-value="{ key: '1' }"
                style="width: 250px"
                @change="handleChange"
              >
                <a-select-option value="1"> Monday </a-select-option>
                <a-select-option value="2"> Tuesday </a-select-option>
                <a-select-option value="3"> Wednesday </a-select-option>
                <a-select-option value="4"> Thursday </a-select-option>
                <a-select-option value="5"> Friday </a-select-option>
                <a-select-option value="6"> Saturday </a-select-option>
                <a-select-option value="7"> Sunday </a-select-option>
              </a-select>
            </a-form-model-item>

            <a-form-model-item label="What time">
              <a-select
                label-in-value
                :default-value="{ key: '1' }"
                style="width: 250px"
                @change="handleChange"
              >
                <a-select-option value="1"> 12:00 (noon) </a-select-option>
              </a-select>
            </a-form-model-item>

            <a-form-model-item label="Next backup:">
              03/01/21 at 12:00 (noon)
            </a-form-model-item>
          </a-form-model>
        </a-tab-pane>
      </a-tabs>
    </a-form>
  </div>
</template>

<style scoped>
.heading {
  font-size: 20px;
  font-weight: bold;
}

.theL-template-div {
  height: 100%;
}

.theL-search-form {
  padding: 18px 24px;
  background: #fff;
}

.theL-search-form .synopsisRow {
  margin-bottom: 20px;
}

.theL-search-form .synopsis {
  font-weight: bold;
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

<script>
const columns = [
  {
    title: "Backup Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Creation Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "File Size",
    dataIndex: "size",
    key: "size",
  },
  {
    title: "Download",
    scopedSlots: { customRender: "download" },
  },
  {
    title: "Delete",
    scopedSlots: { customRender: "delete" },
  },
];

const data = [
  {
    key: "1",
    name: "assigned music courses",
    date: "02/20/21",
    size: "350 MB",
  },
  {
    key: "2",
    name: "assigned drama courses",
    date: "01/20/21",
    size: "300 MB",
  },
  {
    key: "3",
    name: "first backup",
    date: "12/20/19",
    size: "250 MB",
  },
];

export default {
  data() {
    return {
      data,
      columns,
      labelCol: { span: 3 },
      wrapperCol: { span: 14 },
    };
  },
};
</script>