<template>
  <div class="theL-template-div">
    <a-form class="theL-search-form">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" tab="Courses and Instructors">
          <a-row class="synopsisRow">
            <a-col :span="8">
              <a-select
                label-in-value
                :default-value="{ key: '1' }"
                style="width: 250px"
                @change="handleChange"
              >
                <a-select-option value="1"> View: Courses </a-select-option>
                <a-select-option value="2"> View: Instructors </a-select-option>
              </a-select>
            </a-col>

            <a-col :span="8">
              <a-input-search placeholder="Search" />
            </a-col>
          </a-row>

          <a-table bordered :columns="columns" :data-source="data"></a-table>
        </a-tab-pane>

        <a-tab-pane key="2" tab="Assignments">
          <a-row class="synopsisRow">
            <a-col :span="8">
              <a-input-search placeholder="Search" />
            </a-col>
          </a-row>

          <a-table bordered :columns="assncolumns" :data-source="assndata" />
        </a-tab-pane>
      </a-tabs>
    </a-form>
  </div>
</template>

<style scoped>
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
    title: "Course Code",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Course Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Term",
    dataIndex: "term",
    key: "term",
  },
];

const data = [
  {
    key: "1",
    code: "DRAM 100",
    title: "Introduction to the Theatre",
    term: "FW",
    instr: "Renyk",
    date: "02/20/21",
    made: "Katherine Peter",
  },
  {
    key: "2",
    code: "DRAM 200",
    title: "Theatre History and Literature",
    term: "FW",
    instr: "Jacobson",
    date: "02/20/21",
    made: "Katherine Peter",
  },
  {
    key: "3",
    code: "DRAM 205",
    title: "Theatre in the Age of Television (offered by ASO)",
    term: "W",
    instr: "Renyk",
    date: "02/20/21",
    made: "Katherine Peter",
  },
];

const assncolumns = [
  {
    title: "Course Code",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Course Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Term",
    dataIndex: "term",
    key: "term",
  },
  {
    title: "Instructor",
    dataIndex: "instr",
    key: "instr",
  },
  {
    title: "Date Made",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Made by",
    dataIndex: "made",
    key: "made",
  },
];

const assndata = [
  {
    key: "1",
    code: "DRAM 100",
    title: "Introduction to the Theatre",
    term: "FW",
    instr: "Renyk",
    date: "02/20/21",
    made: "Katherine Peter",
  },
  {
    key: "2",
    code: "DRAM 200",
    title: "Theatre History and Literature",
    term: "FW",
    instr: "Jacobson",
    date: "02/20/21",
    made: "Katherine Peter",
  },
  {
    key: "3",
    code: "DRAM 205",
    title: "Theatre in the Age of Television (offered by ASO)",
    term: "W",
    instr: "Renyk",
    date: "02/20/21",
    made: "Katherine Peter",
  },
];

export default {
  data() {
    return {
      assndata,
      assncolumns,
      data,
      columns,
    };
  },
};
</script>