
<template>
  <div class="theL-template-div">
    <a-form class="theL-search-form">
      <a-form-model
        :model="form"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item>
          <div class="heading">Alex, Markov</div>
        </a-form-model-item>

        <a-form-model-item>
          <a-input placeholder="Course Code" />
        </a-form-model-item>

        <a-form-model-item>
          <a-col :span="8">
            <a-dropdown :trigger="['click']" style="width: 250px">
              <a-menu slot="overlay" @click="handleMenuClick">
                <a-menu-item key="1"> Fall </a-menu-item>
                <a-menu-item key="2"> Winter </a-menu-item>
              </a-menu>
              <a-button style="margin-left: 8px">
                Fall/Winter <a-icon type="down" />
              </a-button>
            </a-dropdown>
          </a-col>

          <a-col :span="8">
            <a-dropdown :trigger="['click']" style="width: 250px">
              <a-menu slot="overlay" @click="handleMenuClick">
                <a-menu-item key="1"> 001 </a-menu-item>
                <a-menu-item key="2"> 002 </a-menu-item>
              </a-menu>
              <a-button style="margin-left: 8px">
                Section # <a-icon type="down" />
              </a-button>
            </a-dropdown>
          </a-col>

          <a-dropdown :trigger="['click']" style="width: 250px">
            <a-menu slot="overlay" @click="handleMenuClick">
              <a-menu-item key="1"> Online </a-menu-item>
              <a-menu-item key="2"> Campus </a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px">
              Online/Campus <a-icon type="down" />
            </a-button>
          </a-dropdown>
        </a-form-model-item>

        <a-form-model-item>
          <a-col :span="6">
            <a-button style="width: 200px" type="primary">Add Lecture</a-button>
          </a-col>
          <a-button style="width: 200px" type="primary">Edit/Delete</a-button>
        </a-form-model-item>

        <a-form-model-item>
          <a-table bordered :columns="columns" :data-source="data"></a-table>
        </a-form-model-item>

        <a-form-model-item>
          <a-button style="width: 400px" type="primary"
            >Confirm Assignment</a-button
          >
        </a-form-model-item>
      </a-form-model>
    </a-form>
  </div>
</template>


<style scoped>
.heading {
  font-size: 30px;
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
  font-size: 20px;
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
    title: "Time",
    dataIndex: "time",
    key: "time",
  },
  {
    title: "Place",
    dataIndex: "place",
    key: "place",
  },
];

const data = [
  {
    key: "1",
    time: "Monday 8:30 AM - 9:30 AM",
    place: "Stirling Hall 106",
  },
  {
    key: "2",
    time: "Tuesday 11:30 AM - 12:30 PM",
    place: "Stirling Hall 106",
  },
  {
    key: "3",
    time: "Friday 10:30 AM - 11:30 AM",
    place: "Stirling Hall 106",
  },
];

export default {
  data() {
    return {
      data,
      columns,
    };
  },
};
</script>