import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

import HolidayCalendarView from "../../components/admin/HolidayCalendarView";

import { getAllHoliday } from "../../services/holiday.service";
import HolidayModal from "../../components/admin/HolidayModal";
import { createHoliday, updateHoliday,deleteHoliday } from "../../services/holiday.service";
const HolidayCalendar = () => {

  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

const [selectedHoliday, setSelectedHoliday] = useState(null);
  const loadHoliday = async () => {

    try {

      setLoading(true);

      const response = await getAllHoliday();

      setHolidays(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

//   handlesaveholiday
const handleSaveHoliday = async (formData)=>{

    try{

        if(selectedHoliday){

            await updateHoliday(
                selectedHoliday._id,
                formData
            );

        }else{

            await createHoliday(formData);

        }

        setOpenModal(false);

        setSelectedHoliday(null);

        loadHoliday();

    }catch(error){

        console.log(error);

    }

}
// delete Function 
const handleDeleteHoliday = async () => {

  if (!selectedHoliday) return;

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this holiday?"
  );

  if (!confirmDelete) return;

  try {

    await deleteHoliday(selectedHoliday._id);

    setOpenModal(false);

    setSelectedHoliday(null);

    loadHoliday();

  } catch (error) {

    console.log(error);

  }

};
  useEffect(() => {

    loadHoliday();

  }, []);

  return (

    <AdminLayout>

      <div className="bg-white rounded-xl shadow-lg p-6">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">

            Holiday Calendar

          </h2>

            <button
                onClick={() => {
                    setSelectedHoliday(null);

                    setOpenModal(true);
               }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                >
                + Add Holiday
        </button>

        </div>

        {

          loading

          ?

          (

            <p className="text-center py-10">

              Loading...

            </p>

          )

          :

          (

            <HolidayCalendarView
    holidays={holidays}
    isAdmin={true}
    onSelectHoliday={(holiday) => {
        setSelectedHoliday(holiday);
        setOpenModal(true);
    }}
/>
          )

        }

      </div>
       <HolidayModal
        isOpen={openModal}
        onClose={() => {
            setOpenModal(false);
            setSelectedHoliday(null);
        }}
        onSave={handleSaveHoliday}
        onDelete={handleDeleteHoliday}
        holiday={selectedHoliday}
        />
    </AdminLayout>

  );

};

export default HolidayCalendar;