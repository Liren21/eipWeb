import {Workbook} from "exceljs";
import {exportDataGrid} from "devextreme/excel_exporter";
import {saveAs} from "file-saver";
import {jsPDF} from "jspdf";
import {exportDataGrid as exportDataGridToPdf} from "devextreme/pdf_exporter";

export const ExportFile = (e) => {
    if (e.format === 'xlsx') {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('Main sheet');
        exportDataGrid({
            worksheet: worksheet,
            component: e.component,
        }).then(function () {
            workbook.xlsx.writeBuffer().then(function (buffer) {
                saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
            });
        });
    } else if (e.format === 'pdf') {
        const doc = new jsPDF({
            orientation: 'landscape',
        });
        exportDataGridToPdf({
            jsPDFDocument: doc,
            component: e.component,
        }).then(() => {
            doc.save('DataGrid.pdf');
        });
    }
}
