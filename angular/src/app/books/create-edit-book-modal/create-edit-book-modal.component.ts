import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
} from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  AuthorDto,
  AuthorServiceProxy,
  BookCategoryDto,
  BookCategoryServiceProxy,
  BookDto,
  BookServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "create-edit-books-modal",
  templateUrl: "./create-edit-book-modal.component.html",
})
export class CreateEditBookModalComponent
  extends AppComponentBase
  implements OnInit
{
  saving = false;
  book = new BookDto();
  bookcategories: BookCategoryDto[] = [];
  authors: AuthorDto[] = [];
  id: number = 0;
  selectedBookCategories: number = null;
  selectedAuthor: number = null;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _bookService: BookServiceProxy,
    private _bookCategoryService: BookCategoryServiceProxy,
    private _authorService : AuthorServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.id) {
      this._bookService.get(this.id).subscribe((res) => {
        this.book = res;
        this.selectedBookCategories = this.book.bookCategoryId;
        this.selectedAuthor = this.book.authorId;
      });
    }
    this._bookCategoryService.getAllBookCategories().subscribe((res) => {
      this.bookcategories = res;
    });
    this._authorService.getAllAuthors().subscribe((res) => {
      this.authors = res;
    });
  }

  save(): void {
    this.saving = true;
    this.book.bookCategoryId = this.selectedBookCategories;
    this.book.authorId = this.selectedAuthor;

    if (this.id !== 0) {
      this._bookService.update(this.book).subscribe(
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
      this._bookService.create(this.book).subscribe(
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
