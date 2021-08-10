<template>
  <div>
    <a-page-header
      class="QDMS-page-header"
      title="  Welcome"
      @back="() => $router.go(-1)"
    >
      <!-- <div class="welcome">
        {{ timeFix }}，{{
          this.$store.state.FirstName + " " + this.$store.state.LastName
        }}<span class="welcome-text">，{{ welcome }}</span>
      </div>
      <div class="role">{this.$store.state.Role}</div> -->

      <template slot="footer">
        <div class="QDMS-page-header-footer">
          <div class="avatar">
            <a-avatar size="large" />
          </div>
          <div class="content">
            <div class="content-title">{{ this.greetingMsg + " "+ this.$store.state.FirstName + " " + this.$store.state.LastName }}</div>
            <div>role</div>
          </div>
          <div class="extra-content">
            <div class="stat-item">
              <a-statistic title="Assignment to do" :value="56" />
            </div>
            <div class="stat-item">
              <a-statistic title="New Message" :value="8" />
            </div>
            <div class="stat-item">
              <a-statistic title="Conflic unsloved" :value="10" />
            </div>
          </div>
        </div>
      </template>
    </a-page-header>

    <a-row :gutter="24">
      <a-col :span="18" :style="{ marginBottom: '24px' }">
        <a-card title="Curriculum Overview">
          <div class="mainCalendar">
            <FullCalendar :options="calendarOptions">
              <template v-slot:eventContent="arg">
                <b>{{ arg.timeText }}</b>
                <i>{{ arg.event.title }}</i>
              </template>
            </FullCalendar>
          </div>
        </a-card>
      </a-col>
      <a-col :span="6" :style="{ marginBottom: '24px' }">
        <chart-card :loading="loading" title="Quick Entry">
          <a-tooltip title="Explaination" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div class="quick entry">
            <div>Instant Backup</div>
            <div>Review Recently Assignment</div>
          </div>
        </chart-card>
      </a-col>
      <a-col :span="6" :style="{ marginBottom: '24px' }">
        <chart-card
          title="Next Lecture"
          style="margin-bottom: 24px"
          :bordered="false"
          :body-style="{ padding: 0 }"
        >
          <div class="nextLecture">
            <span
              >Dear {{ this.$store.FirstName }} your next lecture will start at
              {{ nextLectureTime }}.</span
            >
            <span>Instructor: {{ nextInstructor }}</span>
            <span>Subject:{{ nextSubject }}</span>

            <template slot="footer"
              ><div>
                <a-button
                  size="large"
                  type="primary"
                  :loading="approveButtonLoadingStatus"
                  @click="NextDetailBtn_onClick"
                  >More Detail</a-button
                >
              </div></template
            >
          </div>
        </chart-card>
      </a-col>

      <a-col :span="6" :style="{ marginBottom: '24px' }">
        <chart-card title="Recently Modification History" total="10">
          <a-list item-layout="horizontal" :data-source="lectureList">
            <a-list-item slot="renderItem">
              <a-list-item-meta
                description="test item"
              >
                <a slot="title" href="https://www.antdv.com/">123</a>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </chart-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { ChartCard } from "@/components";
export default {
  name: " Welcome",
  components: {
    FullCalendar, // make the <FullCalendar> tag available
    ChartCard,
  },
  data() {
    return {
      greetingMsg:this.getGreetingMsg(),
      lectureList: [
        {
          title: "Ant Design Title 1",
        },
        {
          title: "Ant Design Title 2",
        },
        {
          title: "Ant Design Title 3",
        },
        {
          title: "Ant Design Title 4",
        },
      ],
      calendarOptions: {
        themeSystem: "bootstrap",
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick
        ],
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        initialView: "dayGridMonth",
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      currentEvents: [],
      listData: ["1", "2"],
    };
  },
  methods: {
    getGreetingMsg(){
    let timeNow = new Date();
    let hours = timeNow.getHours();
    let text = ``;
    if (hours >= 0 && hours <= 10) {
        text = `Good Morning`;
    } else if (hours > 10 && hours <= 14) {
        text = `Enjoy your lunch`;
    } else if (hours > 14 && hours <= 18) {
        text = `Good afternoon`;
    } else if (hours > 18 && hours <= 24) {
        text = `Good night`;
    }
    return text;

    },
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends; // update a property
    },
    handleDateSelect(selectInfo) {
      let title = prompt("Please enter a new title for your event");
      let calendarApi = selectInfo.view.calendar;
      calendarApi.unselect(); // clear date selection
      if (title) {
      }
    },
    handleEventClick(clickInfo) {
      if (
        confirm(
          `Are you sure you want to delete the event '${clickInfo.event.title}'`
        )
      ) {
        clickInfo.event.remove();
      }
    },
    handleEvents(events) {
      this.currentEvents = events;
    },
  },
};
</script>


<style lang='less'>
.QDMS-page-header {
  background: #fff;
}

.QDMS-page-header-footer {
  display: flex;
  padding-bottom: 20px;
  margin-bottom: 20px;

  .avatar {
    flex: 0 1 72px;

    & > span {
      display: block;
      width: 72px;
      height: 72px;
      border-radius: 72px;
    }
  }

  .content {
    position: relative;
    top: 4px;
    flex: 1 1 auto;
    margin-left: 24px;
    color: rgba(0, 0, 0, 0.45);
    line-height: 22px;

    .content-title {
      margin-bottom: 12px;
      color: black;
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
    }
  }

  .extra-content {
    float: right;
    white-space: nowrap;

    .stat-item {
      position: relative;
      display: inline-block;
      padding: 0 32px;

      &::after {
        position: absolute;
        top: 8px;
        right: 0;
        width: 1px;
        height: 40px;
        background-color: #e8e8e8;
        content: "";
      }

      &:last-child {
        padding-right: 20px;

        &::after {
          display: none;
        }
      }
    }
  }
}
</style>