import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {AngularFirestore} from '@angular/fire/compat/firestore'

import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';
import * as firebase from "firebase/app"
import "firebase/firestore"

/**
 * @title Table with pagination
 */
@Component({
  selector: 'table-pagination-example',
  styleUrls: ['table-pagination-example.css'],
  templateUrl: 'table-pagination-example.html',
})
export class TablePaginationExample implements OnInit {

  isShown: boolean = false;


  // Columns to show in table
  displayedColumns: string[] = [ 'name', 'email', 'personalInfo', 'timeStamp', 'editObj'];

  // For referencing a local dataset
  //dataSource = new MatTableDataSource<Users>(this.dataSourceInfo);

  // Fot referencing a Firebase dataset
  dataSource: any;
  id: any;
  name: any;
  email: any;
  personalInfo: any;
  timeStamp: any;
  editObj: any;
  actions: any;

  @ViewChild('btnShow')
  btnShow!: ElementRef;
  @ViewChild('btnClose')
  btnClose!: ElementRef;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  title = "Add a User";
  add: any;
  edit: any;

  constructor(
    public store: AngularFirestore,
    private _liveAnnouncer: LiveAnnouncer
  ){}

  ngOnInit() {
    this.getAll();
    // this.dataSource.sort = this.sort;

    // const sortState: Sort = {active: 'timeStamp', direction: 'desc'};
    // this.sort.active = sortState.active;
    // this.sort.direction = sortState.direction;
    // this.sort.sortChange.emit(sortState);
  }

  openDialog(arg: string | undefined){
    if (arg === 'add') {
      this.title = 'Add a User'
    }
    this.btnShow.nativeElement.click();
  }

  closeDialog(){
    this.clearEdit();
    this.btnClose.nativeElement.click();
  }

  goBack() {
    window.history.go(-1);
  }

  clearEdit(){
    this.editObj = null;
    this.name = "";
    this.personalInfo = "";
    this.email = "";
  }

  addUser(){

    const todayDate = new Date();
    console.log("Date now: ", todayDate)

    if(this.editObj){
      this.store.collection('list')
        .doc(this.editObj.id)
        .update({
          name: this.name,
          personalInfo: this.personalInfo,
          email: this.email,
          timeStamp : todayDate
        });
    } else {
      this.store.collection('list')
        .add({
          name: this.name,
          personalInfo: this.personalInfo,
          email: this.email,
          timeStamp : todayDate
        });
    }
    this.clearEdit();
    this.closeDialog();
  }

  editUser(id: string){
    this.title = "Edit User"
    this.store.collection('list')
      .doc(id).get()
      .subscribe((response) => {
        this.editObj = Object.assign({id: response.id}, response.data());
        this.name = this.editObj.name;
        this.personalInfo = this.editObj.personalInfo;
        this.email = this.editObj.email;
        this.openDialog(this.edit);
      })
      this.clearEdit();
  }

  delete(id: string){
    const result = confirm('Are you sure you wish to delete?');
    if (result) {
      this.store.collection('list').doc(id).delete();
    }
  }

  getAll(){
    this.store.collection('list')
   .snapshotChanges()
   .subscribe((response) => {
     this.dataSource = new MatTableDataSource(response.map(item => {
       console.log("===============> item.payload.doc.data() response: ", item.payload.doc.data())

       return Object.assign(
         { id: item.payload.doc.id },
         { timeStamp: this.timeStamp },
         item.payload.doc.data()
       )
     }))
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
     console.log("===============> response: ", response)
   });
}

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}



// $('#exampleModal').on('show.bs.modal', function (event: { relatedTarget: any; }) {
//   var button = $(event.relatedTarget) // Button that triggered the modal
//   var recipient = button.data('whatever') // Extract info from data-* attributes
//   // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
//   // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
//   var modal = $(this)
//   modal.find('.modal-title').text('New message to ' + recipient)
//   modal.find('.modal-body input').val(recipient)
// })




// ngOnInit() {
// this.moviesService.getPopularTVShows().subscribe(res => {
//   this.dataSource = new MatTableDataSource(res.results);
//   ^^^^^^^^^^^^^^^^^^
//   this.dataSource.paginator = this.paginator;
//   this.dataSource.sort = this.sort;
//   });
//   }

// export interface Users {
//   id: string;
//   name: string;
//   email: string;
//   personalInfo: string;
// }

// //const ELEMENT_DATA: Users[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
//   {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
//   {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
//   {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
//   {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
//   {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
//   {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
//   {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
//   {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
//   {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
//   {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
// ];
