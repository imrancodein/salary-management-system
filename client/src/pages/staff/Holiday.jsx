import { useEffect, useState } from "react";

import StaffLayout from "../../layouts/StaffLayout";

import HolidayCalendarView from "../../components/admin/HolidayCalendarView";

import { getAllHoliday } from "../../services/holiday.service";

const Holiday = () => {

    const [holidays,setHolidays]=useState([]);

    const [loading,setLoading]=useState(false);

    const loadHoliday=async()=>{

        try{

            setLoading(true);

            const response=await getAllHoliday();

            setHolidays(response.data);

        }catch(error){

            console.log(error);

        }finally{

            setLoading(false);

        }

    };

    useEffect(()=>{

        loadHoliday();

    },[]);

    return(

        <StaffLayout>

            <div className="bg-white rounded-xl shadow-lg p-6">

                <h2 className="text-2xl font-bold mb-5">

                    Holiday Calendar

                </h2>

                {

                    loading

                    ?

                    <p>Loading...</p>

                    :

                    <HolidayCalendarView
                    holidays={holidays}
                    onSelectHoliday={(holiday)=>{
                        setSelectedHoliday(holiday);
                        setOpenModal(true);
                    }}
                />

                }

            </div>

        </StaffLayout>

    );

};

export default Holiday;