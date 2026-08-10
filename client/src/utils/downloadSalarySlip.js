import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "../assets/mdss.png"
const downloadSalarySlip = (salary) => {
  const doc = new jsPDF();
  // A4 Width = 210

// Logo
doc.addImage(logo, "PNG", 15, 10, 22, 22);

// NGO Name
doc.setFont("helvetica", "bold");
doc.setFontSize(18);

doc.text(
  "MANVIYA DRISTIKON SEWA SAMITI",
  105,
  18,
  {
    align: "center",
  }
);

// Salary Slip
doc.setFontSize(14);

doc.text(
  "SALARY SLIP",
  105,
  28,
  {
    align: "center",
  }
);

// Line
doc.line(15, 36, 195, 36);

// Employee Information

doc.setFontSize(11);
doc.setFont("helvetica", "normal");

doc.text(
  `Employee Name : ${salary.staff?.name}`,
  15,
  48
);

doc.text(
  `Employee ID : ${salary.staff?.employeeId}`,
  15,
  56
);

doc.text(
  `Department : ${salary.staff?.department?.name}`,
  15,
  64
);
const slipNo = `SLIP-${salary.year}-${salary.month}-${salary.staff?.employeeId}`;

doc.text(
  `Salary Slip No : ${slipNo}`,
  120,
  40
);

doc.text(
  `Month : ${salary.month} ${salary.year}`,
  120,
  48
);

doc.text(
  `Status : ${salary.status}`,
  120,
  56
);

doc.text(
  `Generated : ${new Date().toLocaleDateString(
    "en-IN"
  )}`,
  120,
  64
);

// Line

doc.line(15, 72, 195, 72);

autoTable(doc, {
  startY: 78,

  head: [["Earnings / Deductions", "Amount"]],

  body: [
    ["Basic Salary", `Rs. ${salary.basicSalary}`],
    ["Bonus", `Rs. ${salary.bonus}`],
    ["Deduction", `Rs. ${salary.deduction}`],
    ["Net Salary", `Rs. ${salary.netSalary}`],
  ],

  theme: "grid",

  headStyles: {
    fillColor: [37, 99, 235], // Blue
    textColor: 255,
    fontStyle: "bold",
    halign: "center",
    fontSize: 12,
  },
  styles: {
  fontSize: 10,
  overflow: "linebreak",
},

tableWidth: "auto",

columnStyles: {
  0: {
    cellWidth: 110,
  },
  1: {
    cellWidth: 55,
    halign: "right",
  },
},

  bodyStyles: {
    fontSize: 11,
    cellPadding: 4,
  },

  alternateRowStyles: {
    fillColor: [245, 245, 245],
  },

  columnStyles: {
    1: {
      halign: "right",
    },
  },

  didParseCell: function (data) {
    if (data.row.index === 3) {
      data.cell.styles.fontStyle = "bold";
      data.cell.styles.fillColor = [220, 252, 231];
    }
  },
});
  const finalY = doc.lastAutoTable.finalY + 15;
//   footer section
// Footer Line
doc.line(15, finalY + 25, 195, finalY + 25);

// Footer Title
doc.setFont("helvetica", "bold");
doc.setFontSize(11);

doc.text(
  "This is a computer generated salary slip.",
  105,
  finalY + 35,
  {
    align: "center",
  }
);

// Small Text
doc.setFont("helvetica", "normal");
doc.setFontSize(10);

doc.text(
  "No signature is required.",
  105,
  finalY + 42,
  {
    align: "center",
  }
);

// Signature Area
doc.line(145, finalY + 58, 190, finalY + 58);

doc.setFont("helvetica", "bold");

doc.text(
  "Authorized Signatory",
  167,
  finalY + 65,
  {
    align: "center",
  }
);

doc.setFont("helvetica", "normal");

doc.text(
  "MANVIYA DRISTIKON SEWA SAMITI",
  167,
  finalY + 72,
  {
    align: "center",
  }
);

  doc.text(
    `Status : ${salary.status}`,
    15,
    finalY
  );

  doc.text(
    `Payment Mode : ${salary.paymentMode || "-"}`,
    15,
    finalY + 8
  );

  doc.text(
    `Payment Date : ${
      salary.paymentDate
        ? new Date(
            salary.paymentDate
          ).toLocaleDateString()
        : "-"
    }`,
    15,
    finalY + 16
  );

  doc.save(
    `${salary.staff?.name}_SalarySlip.pdf`
  );
};

export default downloadSalarySlip;