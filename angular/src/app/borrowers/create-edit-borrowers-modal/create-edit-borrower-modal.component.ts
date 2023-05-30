import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
} from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  BookServiceProxy,
  BorrowerDto,
  BookDto,
  BorrowerServiceProxy,
  StudentDto,
  StudentServiceProxy,
} from "@shared/service-proxies/service-proxies";
import * as moment from "moment";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "create-edit-borrower-modal",
  templateUrl: "./create-edit-borrower-modal.component.html",
})
export class CreateEditBorrowerModalComponent
  extends AppComponentBase
  implements OnInit
{
  saving = false;
  borrower = new BorrowerDto();
  books: BookDto[] = [];
  students: StudentDto[] = [];
  id: number = 0;
  selectedBook: number = null;
  selectedStudent: number = null;
  
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _borrowerService: BorrowerServiceProxy,
    private _bookService: BookServiceProxy,
    private _studentService: StudentServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.id) {
      this._borrowerService.getBorrowWithBookAndStudentUnderBookCategory(this.id).subscribe((res:BorrowerDto) => {
        this.borrower = res;
        this.borrower.id = res.id;
        this.selectedBook = res.bookId;
        this.selectedStudent = res.studentId;
        this.borrower.borrowDate = this.formatDate(res.borrowDate);
        this.borrower.expectedReturnDate = this.formatDate(res.expectedReturnDate);
      });
    }

    this._bookService.getAllBooks().subscribe((result1) => {
      this.books = result1;
      this.selectedBook = this.borrower.bookId;
    });
    this._studentService.getAllStudents().subscribe((result2) => {
      this.students = result2;
      this.selectedStudent = this.borrower.studentId;
    });
  }

  formatDate(date) {
    var d = new Date(date);
    date = [
        d.getFullYear(),
        ('0' + (d.getMonth() + 1)).slice(-2),
        ('0' + d.getDate()).slice(-2)
    ].join('-');
    return date;
}

/* onExpectedReturnDateChange(): void{
  const borrowDate = moment(this.borrower.borrowDate);
  this.borrower.expectedReturnDate = moment(borrowDate.clone().add(7, 'days').toDate());
} */
  

  save(): void {
    this.saving = true;
    this.borrower.id = this.id;
    this.borrower.bookId = this.selectedBook;
    this.borrower.studentId = this.selectedStudent;

    this.borrower.borrowDate = moment(this.borrower.borrowDate);
    this.borrower.expectedReturnDate = moment(this.borrower.expectedReturnDate);
    
    if(this.borrower.returnDate){
      this.borrower.returnDate = moment(this.borrower.returnDate);
    }

    if (this.id !== 0) {
      this._borrowerService.update(this.borrower).subscribe(
        () => {          
          this.notify.info(this.l("SavedSuccessfully"));
          this.bsModalRef.hide();
          this.onSave.emit();
        },
        () => {
          this.saving = false;
        }
      );
    } else {      
      this._borrowerService.create(this.borrower).subscribe(
        () => {          
          this.notify.info(this.l("SavedSuccessfully"));          
          this.bsModalRef.hide();
          this.onSave.emit();
        },
        () => {
          this.saving = false;
        }
      );
    }
  }
}