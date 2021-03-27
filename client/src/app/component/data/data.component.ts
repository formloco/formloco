import { Component, OnInit, ViewChild, Input } from '@angular/core'

import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { DomSanitizer } from '@angular/platform-browser'

import { ExportComponent } from '../dialogs/export/export.component'

import { AppService } from "../../service/app.service"
import { AuthService } from "../../service/auth.service"
import { DataService } from "../../service/data.service"
import { FormService } from "../../service/form.service"
import { BuilderService } from "../../service/builder.service"

import { IdbCrudService } from "../../service-idb/idb-crud.service"

import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  @Input() form

  staticUrl = environment.staticUrl

  user
  forms
  files
  token
  columns
  isFiles: boolean = false
  isData: boolean = true

  filePaths = []
  columnLabels = []
  currentIndex: number
  currentFileIndex: number

  columnsToDisplay: string[]

  data: any
  dataSource: MatTableDataSource<any>

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  @ViewChild(MatSort, { static: true }) sort: MatSort

  constructor(
    private dialog: MatDialog,
    public appService: AppService,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private dataService: DataService,
    private formService: FormService,
    public builderService: BuilderService,
    public idbCrudService: IdbCrudService) {
  }

  ngOnInit() {
    this.user = this.authService.userSignedIn()
    if (this.user !== null)
      this.getCloud()
    else
      this.getIdb()
  }

  transform(file) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(file)
  }

  getIdb() {
    this.idbCrudService.readAll('data').subscribe(data => {
      this.data = data

      if (this.data.length > 0) {
        if (this.data[0].file_array !== undefined) {
          this.data.forEach(element => {
            element.file_array.forEach(ele => {
              this.filePaths.push({ data: ele.content })
            })
          })
          // this.isFiles = true
        }
        else if (this.data[0].file_array.length > 0) this.isFiles = true
        else  if (this.data[0].file_array.length === 0) this.isFiles = false

        this.data = this.data.filter(
          data => data.form_id === this.builderService.formObj.form_id
        )
        this.columnLabels = JSON.parse(this.builderService.formObj.form.labels)
        this.setTable()
      }
    })
  }

  getCloud() {
    let obj = ({
      form_id: this.builderService.formObj.form_id,
      tenant_id: this.builderService.formObj.tenant_id
    })

    this.dataService.getData(obj).subscribe(data => {
      this.data = data
      this.dataSource = this.data
      if (this.data.length > 0) this.setTable()

    })
    /** todo: add file support */
    // if (this.builderService.formObj.is_file) {
    //   this.dataService.getFiles(this.builderService.formObj.tenant_id, this.builderService.formObj.form_id).subscribe(files => {
    //     this.files = files

    //     if (this.files.length > 0) this.isFiles = true

    //     this.files.forEach(element => {
    //       let obj = {
    //         url: this.staticUrl + element.tenant_id + '/' + element.form_id + '/' + element.file_name,
    //         type: element.type
    //       }
    //       this.filePaths.push(obj)
    //     })
    //   })
    // }
  }

  setTable() {
    this.isData = true
    this.columns = Object.keys(this.data[0])
    this.columnLabels = JSON.parse(this.builderService.formObj.form.labels)
    this.columnLabels.push('Date Created')
    this.columnLabels.push('User Created')
    
    let colIndex
    colIndex = this.columns.findIndex(col => col === 'tenant_id')
    if (colIndex != -1) this.columns.splice(colIndex, 1)
    colIndex = this.columns.findIndex(col => col === 'form_id')
    if (colIndex != -1) this.columns.splice(colIndex, 1)
    colIndex = this.columns.findIndex(col => col === 'date_archived')
    if (colIndex != -1) this.columns.splice(colIndex, 1)
    colIndex = this.columns.findIndex(col => col === 'date_updated')
    if (colIndex != -1) this.columns.splice(colIndex, 1)
    colIndex = this.columns.findIndex(col => col === 'id')
    if (colIndex != -1) this.columns.splice(colIndex, 1)
    colIndex = this.columns.findIndex(col => col === 'is_file')
    if (colIndex != -1) this.columns.splice(colIndex, 1)
    colIndex = this.columns.findIndex(col => col === 'file_array')
    if (colIndex != -1) this.columns.splice(colIndex, 1)
    colIndex = this.columns.findIndex(col => col === 'user_updated')
    if (colIndex != -1) this.columns.splice(colIndex, 1)
    colIndex = this.columns.findIndex(col => col === 'user_archived')
    if (colIndex != -1) this.columns.splice(colIndex, 1)
    colIndex = this.columns.findIndex(col => col === 'form_columns')
    if (colIndex != -1) this.columns.splice(colIndex, 1)

    this.columnsToDisplay = this.columns.reverse()
    this.isData = true
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  getFiles(id) {
    this.dataService.getFiles(localStorage.getItem('formTenantId'), id)
      .subscribe(files => {
        this.files = files
        if (this.files.length > 0)
          this.isFiles = true
        else
          this.isFiles = false
      })
  }

  openFile(file, index) {
    this.currentFileIndex = index
  }

  exportData() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '450px'
    dialogConfig.data = {
      form: this.form,
      data: this.data
    }
    const dialogRef = this.dialog.open(ExportComponent, dialogConfig)
  }

  close() {
    if (this.appService.parentPage === 'form-library') this.appService.pageTitle = 'Form Libary'
    if (this.appService.parentPage === 'form-data') this.appService.pageTitle = 'Form Data'
    this.appService.page = this.appService.parentPage
  }

}