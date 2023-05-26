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
  disableSaveButton: boolean = true;
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
      this._borrowerService.get(this.id).subscribe((res) => {
        this.borrower = res;
        this.selectedBook = this.borrower.bookId;
        this.selectedStudent = this.borrower.studentId;
      });
    }
    this._bookService.getAvailableBooks().subscribe((res) => {
      this.books = res;
    });
    this._studentService.getAllStudents().subscribe((res) => {
      this.students = res;
    });
  }

  onStudentChange(): void{
    const student = this.selectedStudent;
    if(student !== 0){
      this._borrowerService.getAllBooksByStudentId(student).subscribe((books) =>{
        this.books = books;
        if(this.books && this.books.length !==0){
          this.selectedBook = null;
          this.disableSaveButton = false;
        }else{
          this.selectedBook = null;
          this.disableSaveButton = true;
        }
      });
    }else{
      this.selectedBook = null;
      this.disableSaveButton = true;
    }
  }

  onExpectedReturnDateChange(): void{
    const borrowDate = moment(this.borrower.borrowDate);
    const expectedReturnDate = borrowDate.clone().add(7, 'days').toDate();
    this.borrower.expectedReturnDate = moment(expectedReturnDate);
  }

  save(): void {
    this.saving = true;
    this.borrower.bookId = this.selectedBook;
    this.borrower.studentId = this.selectedStudent;
    this.borrower.borrowDate = moment(this.borrower.borrowDate);
    this.borrower.expectedReturnDate = moment(this.borrower.expectedReturnDate);
    this.borrower.returnDate = moment(this.borrower.returnDate);
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
