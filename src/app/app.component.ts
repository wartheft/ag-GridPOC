import { Component, OnInit, ViewChild } from '@angular/core';
import  * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  title = 'XlsxFileRead';

  defaultColDef = {
    sortable: true,
    filter: true
};
autoGroupColumnDef = {
  headerName: 'ITEM_NAME',
  field: 'ITEM_NAME',
  cellRenderer: 'agGroupCellRenderer',
  cellRendererParams: {
      checkbox: true
  }
};
  columnDefs = [
    { field: 'ITEM_CODE' ,filter: true,sortable: true,checkboxSelection: true },
    { field: 'ITEM_NAME' ,filter: true,sortable: true },
    { field: 'ITEM_SHORT_NAME',filter: true,sortable: true },
    { field: 'MODEL',filter: true,sortable: true },
    { field: 'DIVNNAME',filter: true,sortable: true },
    { field: 'DEPTNAME',filter: true,sortable: true },,,,,,,,
    { field: 'GROUPNAME',filter: true,sortable: true },
    { field: 'CATGNAME',filter: true,sortable: true },
    { field: 'TYPENAME',filter: true,sortable: true },
    { field: 'SUBTYPENAME',filter: true,sortable: true },
    { field: 'BRANCATG',filter: true,sortable: true },
    { field: 'BRAND',filter: true,sortable: true },
    { field: 'BUSSEG',filter: true,sortable: true },
    { field: 'MANDATORY',filter: true,sortable: true },
    { field: 'ITEM_STK_YN_NUM',filter: true,sortable: true },
    { field: 'ACTIVE_YN',filter: true,sortable: true },
    { field: 'SERIAL_YN',filter: true,sortable: true },
    { field: 'DEPTCODE',filter: true,sortable: true },
    { field: 'GROUPCODE',filter: true,sortable: true },
    { field: 'TYPECODE',filter: true,sortable: true },
    { field: 'SUBTYPECODE',filter: true,sortable: true },
    { field: 'BRANCATGCODE',filter: true,sortable: true },
    { field: 'BRANDCODE',filter: true,sortable: true },
    { field: 'BUSSEGCODE',filter: true,sortable: true },
    { field: 'STATUS',filter: true,sortable: true },
    { field: 'ITEM_GROUP',filter: true,sortable: true },
    { field: 'VAT_CLASS',filter: true,sortable: true },
    { field: 'SUPPCODE',filter: true,sortable: true },
    { field: 'BASE_UOM',filter: true,sortable: true },
    { field: 'DEFAULT_BARCODE',filter: true,sortable: true },
    { field: 'ITEM_HEIGHT',filter: true,sortable: true },
    { field: 'ITEM_LENGTH',filter: true,sortable: true },
    { field: 'ITEM_WIDTH',filter: true,sortable: true },
    { field: 'NET_WEIGHT',filter: true,sortable: true },
    { field: 'GROSS_WEIGHT',filter: true,sortable: true },
    { field: 'ITEM_LONG_NAME',filter: true,sortable: true },
    { field: 'IS_EXT_WARRANTY_ITEM',filter: true,sortable: true },
    { field: 'IS_GV_ITEM',filter: true,sortable: true },
    { field: 'IS_EVOUCHER',filter: true,sortable: true },
    { field: 'IS_TRADEIN',filter: true,sortable: true },
    { field: 'AGREED_MARGIN',filter: true,sortable: true },
    { field: 'IS_FOC_ITEM',filter: true,sortable: true },
    { field: 'IS_CONSIGNMENT_ITEM',filter: true,sortable: true },
    { field: 'CATEGORY_CLASS_ENG',filter: true,sortable: true }							
];
rowData = [];
constructor(private http: HttpClient) {

}

ngOnInit() {
    //this.rowData = this.http.get('https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/sample-data/smallRowData.json');
}
  file:File
  arrayBuffer:any
  filelist:any

  addfile(event)     
  {    
  this.file= event.target.files[0];     
  let fileReader = new FileReader();    
  fileReader.readAsArrayBuffer(this.file);     
  fileReader.onload = (e) => {    
      this.arrayBuffer = fileReader.result;    
      var data = new Uint8Array(this.arrayBuffer);    
      var arr = new Array();    
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
      var bstr = arr.join("");    
      var workbook = XLSX.read(bstr, {type:"binary"});    
      var first_sheet_name = workbook.SheetNames[0];    
      var worksheet = workbook.Sheets[first_sheet_name];    
     this.rowData=XLSX.utils.sheet_to_json(worksheet,{raw:true});    

      //  var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true});     
            // this.filelist = [];                
            // console.log(this.filelist)    
    
  }  
    
}    
getSelectedRows() {
  const selectedNodes = this.agGrid.api.getSelectedNodes();
  const selectedData = selectedNodes.map(node => node.data );
  const selectedDataStringPresentation = selectedData.map(node => node.ITEM_NAME + ' ' + node.ITEM_SHORT_NAME).join(', ');

  alert(`Selected nodes: ${selectedDataStringPresentation}`);
}

}



