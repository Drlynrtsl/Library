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
  borrowers: BorrowerDto[] = [];
  books: BookDto[] = [];
  students: StudentDto[] = [];
  id: number = 0;
  selectedBook: number = null;
  selectedStudent: number = null;
  today = new Date();

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
    this.borrower.borrowDate = this.formatDate(this.today);

    if (this.id) {
      this._borrowerService.get(this.id).subscribe((res) => {
        this.borrower = res;
        this.selectedBook = res.bookId;
        /* this.books.push(res.book); */
        /* this.books = [res.book]; */
        this.selectedStudent = res.studentId;
        this.borrower.borrowDate = this.formatDate(res.borrowDate);
        this.borrower.expectedReturnDate = this.formatDate(
          res.expectedReturnDate
        );

        this._borrowerService
          .getAllBooksByStudentId(this.selectedStudent)
          .subscribe((res: BookDto[]) => {
            this.borrower.bookId;
            this.selectedBook;
            res.forEach((x) => this.books.push(x));
          });
      });

      this._borrowerService
        .getBorrowWithBookAndStudentUnderBookCategory(this.id)
        .subscribe((res: BorrowerDto) => {
          this.books.push(res.book);
          this.students = [res.student];
        });
    }

    this._studentService.getAllStudents().subscribe((res) => {
      this.students = res;
    });

    if (this.borrower.borrowDate) {
      const borrowDate = moment(this.borrower.borrowDate);
      this.borrower.expectedReturnDate = this.formatDate(
        moment(borrowDate.add(7, "days"))
      );
    }
  }

  formatDate(date) {
    var d = new Date(date);
    date = [
      d.getFullYear(),
      ("0" + (d.getMonth() + 1)).slice(-2),
      ("0" + d.getDate()).slice(-2),
    ].join("-");

    return date;
  }

  onStudentChange(event) {
    this.selectedStudent = event;
    if (this.selectedStudent) {
      this._borrowerService
        .getAllBooksByStudentId(this.selectedStudent)
        .subscribe((res: BookDto[]) => {
          this.books = res;
        });
    }
  }

  save(): void {
    this.saving = true;
    /* this.borrower.bookId; */
    /* this.borrower.bookId = this.selectedBook; */
    this.borrower.studentId = this.selectedStudent;

    this.borrower.borrowDate = moment.utc(this.borrower.borrowDate);
    this.borrower.expectedReturnDate = moment.utc(
      this.borrower.expectedReturnDate
    );

    if (this.borrower.returnDate) {
      this.borrower.returnDate = moment(this.borrower.returnDate);
    }

    if (this.id > 0) {
      if (this.borrower.bookId == this.selectedBook) {
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
        this._bookService
          .getUpdatedBookTitleFromBorrower(this.borrower.bookId)
          .subscribe(() => {
            this.borrower.bookId = this.selectedBook;
            this._borrowerService.update(this.borrower).subscribe(
              () => {
                this._bookService
                  .getUpdatedBookTitleFromBorrower(this.borrower.bookId)
                  .subscribe(() => {
                    this.notify.info(this.l("SavedSuccessfully"));
                    this.bsModalRef.hide();
                    this.onSave.emit();
                  });
              },
              () => {
                this.saving = false;
              }
            );
          });
      }
    } else {
      this.borrower.bookId = this.selectedBook;
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
