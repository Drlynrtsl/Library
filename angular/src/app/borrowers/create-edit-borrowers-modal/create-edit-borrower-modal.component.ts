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

  save(): void {
    this.saving = true;
    this.borrower.bookId = this.selectedBook;
    this.borrower.studentId = this.selectedStudent;
    if (this.id !== 0) {
      this._borrowerService.update(this.borrower).subscribe(
        () => {
          this.borrower.book.isBorrowed = false;
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
          this.borrower.book.isBorrowed = true;
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
