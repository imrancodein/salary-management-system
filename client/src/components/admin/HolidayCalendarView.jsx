import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";

import {
  format,
  parse,
  startOfWeek,
  getDay,
} from "date-fns";

import enUS from "date-fns/locale/en-US";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// eventpropgetter
const eventStyleGetter = (event) => {

  let backgroundColor = "#2563eb";

  if (event.resource.type === "National Holiday") {
    backgroundColor = "#ef4444";
  }

  if (event.resource.type === "Festival") {
    backgroundColor = "#16a34a";
  }

  if (event.resource.type === "NGO Holiday") {
    backgroundColor = "#2563eb";
  }

  if (event.resource.type === "Optional Holiday") {
    backgroundColor = "#eab308";
  }

  return {
    style: {
      backgroundColor,
      borderRadius: "6px",
      color: "#fff",
      border: "none",
      fontSize: "12px",
      padding: "2px 4px",
    },
  };
};
// sunday
const dayPropGetter = (date) => {

  if (date.getDay() === 0) {

    return {
      style: {
        backgroundColor: "#fee2e2",
      },
    };

  }

  return {};

};
const HolidayCalendarView = ({
    
  holidays,
   onSelectHoliday,
   isAdmin = false,
}) => {
    const [currentDate, setCurrentDate] = useState(new Date());

  const events = holidays.map((holiday) => ({

    title: holiday.name,

    start: new Date(holiday.date),

    end: new Date(holiday.date),

    allDay: true,

    resource: holiday,

  }));

  return (
<div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-5 mt-5">

  {/* Custom Toolbar */}

  <div className="flex justify-between items-center mb-5">

    <div className="flex gap-2">

      <button
        onClick={() => {
          const date = new Date(currentDate);
          date.setMonth(date.getMonth() - 1);
          setCurrentDate(date);
        }}
        className="px-3 py-2 border rounded-lg hover:bg-gray-100"
      >
         Back
      </button>

      <button
        onClick={() => setCurrentDate(new Date())}
        className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Today
      </button>

      <button
        onClick={() => {
          const date = new Date(currentDate);
          date.setMonth(date.getMonth() + 1);
          setCurrentDate(date);
        }}
        className="px-3 py-2 border rounded-lg hover:bg-gray-100"
      >
        Next
      </button>

    </div>

    <h2 className="text-xl font-semibold">

      {format(currentDate, "MMMM yyyy")}

    </h2>

  </div>

  <Calendar

    localizer={localizer}

    events={events}

    startAccessor="start"

    endAccessor="end"

    date={currentDate}

    onNavigate={(date) => setCurrentDate(date)}

    toolbar={false}

    views={["month"]}

    popup

    style={{
      height: 420,
    }}

    eventPropGetter={eventStyleGetter}

    dayPropGetter={dayPropGetter}

    onSelectEvent={(event) => {
      if (isAdmin && onSelectHoliday) {
        onSelectHoliday(event.resource);

    }
    }}

  />

</div>
   

  );

};

export default HolidayCalendarView;