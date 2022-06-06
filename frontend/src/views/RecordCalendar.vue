<template>
    <div class="calendar">
        <div class="pa-5">
            <v-row>
                <v-col cols="12" md="6" class="mb-4">
                    <v-sheet height="400">
                        <v-calendar
                                ref="calendar"
                        ></v-calendar>
                    </v-sheet>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
export default {
  name: 'RecordCalendar'
}
</script>

<style lang="scss" scoped>

</style>
