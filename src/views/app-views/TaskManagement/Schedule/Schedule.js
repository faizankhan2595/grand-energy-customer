import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import TaskManagement from "assets/svg/TaskManagement.svg";
import { Card, Input } from 'antd';
import PageHeading from 'components/shared-components/PageHeading/PageHeading';
import './Schedular.css'
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Schedule() {

  const [weekendsVisible, setWeekendsVisible] = useState(true)
  const [currentsEvents, setCurrentsEvents] = useState([])
  const [eventData, setEventData] = useState([])
  const tok = localStorage.getItem('token')
  const customer_id = localStorage.getItem('customer_id')
  const [tasks, setTasks] = useState([])
  const history = useHistory()

  const handleDateSelect = (selectInfo) => {
    // let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    // calendarApi.unselect() // clear date selection

    console.log(createEventId())
    console.log(selectInfo.startStr)
    console.log(selectInfo.endStr)
    console.log(selectInfo.allDonay)

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   })
    // }
  }

  function convertTo24HourTime(isoDateString) {
    const date = new Date(isoDateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    // const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  }


  function renderEventContent(eventInfo) {
    let startTime = (convertTo24HourTime(eventInfo.event.start))
    let endTime = convertTo24HourTime(eventInfo.event.end)
    console.log(eventInfo.event.extendedProps)
    if (eventInfo.view.type === "timeGridWeek") {
      return (
        <div style={styles}>
          {eventInfo.event.title}              {startTime} - {endTime}
          <div style={{
            padding:"5px"
          }}> {
            eventInfo.event.extendedProps.images.map((item, index) => {
              return item && <img key={index} src={item} alt="profile" style={{ width: "30px", height: "30px", borderRadius: "50%" }} />
            })}
          </div>
        </div>
        // <div style={{display:"flex",flexDirection:'row',gap:"4px"}}>
        //   <div>{eventInfo.event.title} </div>
        //   <div>{(eventInfo.timeText)}</div>
        // </div>
      )
    }
    else if (eventInfo.view.type === "timeGridDay") {
      return (
        <div style={styles}>
          {eventInfo.event.title}-   {startTime} - {endTime}
          <div style={{
            padding:"5px"
          }}> {
            eventInfo.event.extendedProps.images.map((item, index) => {
              return item && <img key={index} src={item} alt="profile" style={{ width: "30px", height: "30px", borderRadius: "50%" }} />
            })}
          </div>
        </div>
      )
    }
    else {
      return (
        <div style={styles}>
          {eventInfo.event.title}-    {startTime} - {endTime}
          <div style={{
            padding:"5px"
          }}> {
            eventInfo.event.extendedProps.images.map((item, index) => {
              return item && <img key={index} src={item} alt="profile" style={{ width: "30px", height: "30px", borderRadius: "50%" }} />
            })}
          </div>
        </div>
      )

    }
  }

  const handleEventClick = (clickInfo) => {
    // if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove()
    // }
    console.log(clickInfo.event._def)
    let task = clickInfo.event._def.extendedProps
    console.log(task);
    let jobsiteIndex = getJobSiteIndex(task.cust_id, task.job_site_id)
    let url = `/app/task-management/task/job-sites-tasks/${task.contract_id}`
    history.push(url);

  }

  const handleEvents = (events) => {
    console.log(events)
    console.log(currentsEvents)

    setCurrentsEvents(eventData)
  }

  // const onSearch = (value) => console.log(value);

  const getTasks = () => {
    axios({
      method: 'post',
      url: "/api/tc/get-tasks",
      // headers: {
      //   Authorization: `Bearer ${tok}`
      // },
      data: {
        page_size: 100000,
        job_site_id: null,
        customer_id: customer_id
      }
    }).then((response) => {
      console.log(response.data.data)
      let respData = response.data.data
      let scheduleData = []
      for (let data of respData) {
        let dateStr = new Date(data.task_start_date_time).toISOString().replace(/T.*$/, '')
        let obj = {
          id: data.id,
          title: data.task_name,
          start: data.task_start_date_time,
          end: data.task_end_date_time,
          contract_id: data.tc_contract_id,
          cust_id: data.tc_customer_id,
          task_id: data.id,
          // borderColor:"red",
        color:"#EAF2DD",
        textColor:"#0369A1",
        borderColor: " #97BE54",
          job_site_id: data.tc_customer_job_site_id,
          serviceType: data.service_type,
          images: data.users.map((item) => {
            return item.profile_pic
          })
        }
        scheduleData.push(obj)
      }
      // console.log(INITIAL_EVENTS)
      // setTimeout(() => {
      setEventData(scheduleData)
      // }, 1500);
      // if (response.data.success) {
      //   setTasks(response.data.data.data)
      // }
      // alert(response.data.status)
    }).catch((err) => {
      console.log(err)
    });
  }

  const getJobSiteIndex = (cust_id, job_site_id) => {
    axios({
      method: 'post',
      url: "/api/tc/get-customer-job-sites",
      headers: {
        Authorization: `Bearer ${tok}`
      },
      data: { customer_id: customer_id }
    }).then((response) => {
      console.log(response.data)
      if (response.data.success) {
        console.log(response.data.data.data)
        let idx = (response.data.data.data).findIndex(object => {
          return object.id === job_site_id;
        });
        return idx
      }
    }).catch((err) => {
      console.log(err)
    });
    return 0
  }

  useEffect(() => {
    getTasks()
  }, [])

  useEffect(() => {
    handleEvents()
  }, [eventData])

  return (
    <div>
      <PageHeading
        icon={TaskManagement}
        title="Task Management / Schedule"
      />
      <Card>
        {/* <div className='d-flex'>
          <Input.Search
            className='mb-2'
            placeholder="Search"
            onSearch={onSearch}
            style={{
              width: 200,
              marginLeft: "auto"
            }}
          />
        </div> */}

        <FullCalendar
          height={"auto"}
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: 'today,prev,next',
            center: 'timeGridDay,timeGridWeek,dayGridMonth',
            right: "title",
          }}
          initialView='timeGridWeek'
          editable={false}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          events={eventData}
          select={handleDateSelect}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventsSet={handleEvents}
          eventChange={function (events) { console.log(events) }}

        // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
        //  you can update a remote database when these fire:
        // eventAdd={function(){}}
        // eventRemove={function(){}}
        />
      </Card>
    </div>
  )
}

export default Schedule


const styles = {
  width: "100%", /* Set a fixed width for the container */
  whiteSpace: "nowrap", /* Prevent the text from breaking to next line */
  overflow: "hidden", /* Hide text that is outside the container */
  textOverflow: "ellipsis", /* If text-overflow is clipped, a string (...) is inserted to represent clipped text */
}