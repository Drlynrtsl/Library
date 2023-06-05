import { Component, Injector } from "@angular/core";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  BookCategoryDto,
  BookCategoryServiceProxy,
  BookDto,
  BookDtoPagedResultDto,
  BookServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { finalize } from "rxjs/operators";
import { CreateEditBookModalComponent } from "./create-edit-book-modal/create-edit-book-modal.component";

class PagedBooksRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: "./books.component.html",
  animations: [appModuleAnimation()]
})
export class BooksComponent extends PagedListingComponentBase<BookDto> {
  books: BookDto[] = [];
  keyword = "";
  isActive: boolean | null;
  bookcategories: BookCategoryDto[] = [];

  constructor(
    injector: Injector,
    private _bookService: BookServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  createBook() {
    this.showCreateOrEditBooksModal();
  }

  editBook(id){
    this.showCreateOrEditBooksModal(id);
  }

  protected list(
    request: PagedBooksRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._bookService
      .getAll(
        request.keyword, 
        request.skipCount, 
        request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: BookDtoPagedResultDto) => {
        this.books = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(book: BookDto): void {
    abp.message.confirm(
      this.l("BookCategoryDeleteWarningMessage", book.bookTitle),
      undefined,
      (result: boolean) => {
        if (result) {
          this._bookService.delete(book.id).subscribe(() => {
            abp.notify.success(this.l("SuccessfullyDeleted"));
            this.refresh();
          });
        }
      }
    );
  }
  
  private showCreateOrEditBooksModal(id?: number): void {
    let createOrEditBooksModal: BsModalRef;
    if (!id) {
      createOrEditBooksModal = this._modalService.show(
        CreateEditBookModalComponent,
        {
          class: "modal-lg",
        }
      );
    } else {
      createOrEditBooksModal = this._modalService.show(
        CreateEditBookModalComponent,
        {
          class: "modal-lg",
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditBooksModal.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
