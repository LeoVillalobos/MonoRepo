<script setup lang="ts">
 import { useDate } from 'vuetify';
import {reactive, onMounted} from "vue"
 const data = reactive({
      type: "month",
      types: ['month', 'week', 'day'],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        { title: 'Sun - Sat', value: [0, 1, 2, 3, 4, 5, 6] },
        { title: 'Mon - Sun', value: [1, 2, 3, 4, 5, 6, 0] },
        { title: 'Mon - Fri', value: [1, 2, 3, 4, 5] },
        { title: 'Mon, Wed, Fri', value: [1, 3, 5] },
      ],
      value: [new Date()],
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      titles: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
 })

 const getEventColor = (event) => {
        return event.color
      };

 const  getEvents = ({ start, end }) => {
        const events = []

        const min = start
        const max = end
        const days = (max.getTime() - min.getTime()) / 86400000
        const eventCount = rnd(days, days + 20)

        for (let i = 0; i < eventCount; i++) {
          const allDay = rnd(0, 3) === 0
          const firstTimestamp = rnd(min.getTime(), max.getTime())
          const first = new Date(firstTimestamp - (firstTimestamp % 900000))
          const secondTimestamp = rnd(2, allDay ? 288 : 8) * 900000
          const second = new Date(first.getTime() + secondTimestamp)

          events.push({
            title: data.titles[rnd(0, data.titles.length - 1)],
            start: first,
            end: second,
            color: data.colors[rnd(0, data.colors.length - 1)],
            allDay: !allDay,
          })
        }

        data.events = events
      };

      const rnd =(a, b) => {
        return Math.floor((b - a + 1) * Math.random()) + a
      };



 onMounted(() => {
  const adapter = useDate();
      getEvents({ start: adapter.startOfDay(adapter.startOfMonth(new Date())), end: adapter.endOfDay(adapter.endOfMonth(new Date())) })
 })
</script>

<template>
  <div>
    <v-sheet
      class="d-flex"
      height="54"
      tile
    >
      <v-select
        v-model="data.type"
        :items="data.types"
        class="ma-2"
        label="View Mode"
        variant="outlined"
        dense
        hide-details
      ></v-select>
      <v-select
        v-model="data.weekday"
        :items="data.weekdays"
        class="ma-2"
        label="weekdays"
        variant="outlined"
        dense
        hide-details
      ></v-select>
    </v-sheet>
    <v-sheet>
      <v-calendar
        ref="calendar"
        v-model="data.value"
        :events="data.events"
        :view-mode="data.type"
        :weekdays="data.weekday"
      ></v-calendar>
    </v-sheet>
  </div>
</template>
