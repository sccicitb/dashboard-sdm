import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const formatCurrency = (value) => {
  return value; // In Excel, we want raw numbers. We can apply formatting if needed, but raw is best for calc.
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

export const generateExcel = (data, period) => {
  console.log("Generating Excel with data:", data);
  try {
    const wb = XLSX.utils.book_new();

    // --- 1. RESUME Sheet ---
    const resumeSheetData = [];
    resumeSheetData.push(["RESUME REPORT", `Period: ${period === 'all' ? 'All Years' : period}`]);
    resumeSheetData.push([]); // Empty row

    // Table 1: Target vs Realisasi
    resumeSheetData.push(["TARGET vs REALISASI"]);
    resumeSheetData.push(["Organisasi", "Target", "Realisasi (Q1)", "Target (Q1)", "Realisasi (Q2)", "Target (Q2)"]);
    
    if (data.resume.target && data.resume.target.length > 0) {
      data.resume.target.forEach(item => {
        resumeSheetData.push([
          item.name,
          item.target,
          item.realization_q1,
          item.target_q1,
          item.realization_q2,
          item.target_q2
        ]);
      });
    } else {
      resumeSheetData.push(["No data available"]);
    }
    resumeSheetData.push([]);

    // Table 2: Project Status Values (Total Nilai)
    resumeSheetData.push(["PROJECT STATUS VALUES (Total Nilai)"]);
    resumeSheetData.push(["Organisasi", "Kontrak", "Negosiasi", "Proposal", "Inisiasi"]);
    
    if (data.resume.summary && data.resume.summary.length > 0) {
      data.resume.summary.forEach(item => {
        resumeSheetData.push([
          item.organization,
          item.kontrak_value,
          item.negosiasi_value,
          item.proposal_value,
          item.inisiasi_value
        ]);
      });
    }
    resumeSheetData.push([]);

    // Table 3: Estimated Income (Estimasi Pendapatan)
    resumeSheetData.push(["ESTIMATED INCOME (Estimasi Pendapatan)"]);
    resumeSheetData.push(["Organisasi", "Kontrak", "Negosiasi", "Proposal", "Inisiasi"]);

    if (data.resume.summary && data.resume.summary.length > 0) {
      data.resume.summary.forEach(item => {
        resumeSheetData.push([
          item.organization,
          item.kontrak_estimate,
          item.negosiasi_estimate,
          item.proposal_estimate,
          item.inisiasi_estimate
        ]);
      });
    }
    resumeSheetData.push([]);

    // Table 4: Client Count
    resumeSheetData.push(["CLIENT COUNT"]);
    resumeSheetData.push(["Organisasi", "Kontrak", "Negosiasi", "Proposal", "Inisiasi"]);

    if (data.resume.summary && data.resume.summary.length > 0) {
      data.resume.summary.forEach(item => {
        resumeSheetData.push([
          item.organization,
          item.kontrak_count,
          item.negosiasi_count,
          item.proposal_count,
          item.inisiasi_count
        ]);
      });
    }
    resumeSheetData.push([]);

    // Table 5: Total Summary
    resumeSheetData.push(["TOTAL SUMMARY"]);
    resumeSheetData.push(["Organisasi", "Total Nilai", "Estimasi Pendapatan"]);

    if (data.resume.summary && data.resume.summary.length > 0) {
      data.resume.summary.forEach(item => {
        resumeSheetData.push([
          item.organization,
          item.total_value,
          item.total_estimate
        ]);
      });
    }

    const wsResume = XLSX.utils.aoa_to_sheet(resumeSheetData);
    XLSX.utils.book_append_sheet(wb, wsResume, "RESUME");

    // --- 2. Organization Sheets ---
    const organizations = ['SCCIC', 'IDSxLCI', 'Urbansolv', 'IDH'];
    const projectHeaders = [
      "No.", "Mitra", "Proyek", "Dana Kontrak", "Anggaran", 
      "Estimasi Pendapatan", "Status", "PIC", "Catatan", "Outsource", "Update"
    ];

    organizations.forEach(org => {
      // Handle potential null/undefined data.projects
      const orgData = (data.projects || []).filter(p => 
        p.organization && p.organization.toLowerCase() === org.toLowerCase()
      );

      const sheetData = [];
      sheetData.push([`PROJECT DATA: ${org}`, `Period: ${period === 'all' ? 'All Years' : period}`]);
      sheetData.push([]);
      sheetData.push(projectHeaders);

      if (orgData.length > 0) {
        orgData.forEach((item, index) => {
          sheetData.push([
            index + 1,
            item.partner,
            item.name,
            item.value,
            item.operational_budget,
            item.tax,
            item.status,
            item.pic,
            item.note,
            item.outsource,
            formatDate(item.updated_at)
          ]);
        });
      } else {
          // Empty table if no data
      }

      const ws = XLSX.utils.aoa_to_sheet(sheetData);
      XLSX.utils.book_append_sheet(wb, ws, org);
    });

    // Write file using file-saver for better browser support
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const fileName = `Dashboard_Export_${period}_${new Date().toISOString().split('T')[0]}.xlsx`;
    
    saveAs(dataBlob, fileName);
    console.log("Excel file generated and saved:", fileName);
    return true;
  } catch (error) {
    console.error("Error in generateExcel:", error);
    throw error;
  }
};
