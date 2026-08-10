import { useState } from "react";

import StaffLayout from "../../layouts/StaffLayout";

import EODForm from "../../components/staff/EODForm";
import EODHistory from "../../components/staff/EODHistory";

const EOD = () => {

  const [refresh, setRefresh] = useState(false);

  return (

    <StaffLayout>

      <div className="max-w-5xl mx-auto space-y-8">

        <EODForm
          onSuccess={() =>
            setRefresh((prev) => !prev)
          }
        />

        <EODHistory
          refresh={refresh}
        />

      </div>

    </StaffLayout>

  );

};

export default EOD;