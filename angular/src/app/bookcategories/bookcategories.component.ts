import { Component, Injector } from "@angular/core";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  BookCategoryDto,
  BookCategoryDtoPagedResultDto,
  BookCategoryServiceProxy,
  DepartmentDto,
  DepartmentServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { CreateEditBookCategoryModalComponent } from "./create-edit-bookcategory-modal/create-edit-bookcategory-modal.component";
import { finalize } from "rxjs/operators";

class PagedBookCategoriesRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: "./bookcategories.component.html",
  animations: [appModuleAnimation()]
})
export class BookCategoriesComponent extends PagedListingComponentBase<BookCategoryDto> {
  bookcategories: BookCategoryDto[] = [];
  id: number;
  keyword = "";
  isActive: boolean | null;
  departments: DepartmentDto[] = [];

  constructor(
    injector: Injector,
    private _bookCategoryService: BookCategoryServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  createBookCategory() {
    this.showCreateOrEditBookCategoriesModal();
  }

  editBookCategory(id) {
    this.showCreateOrEditBookCategoriesModal(id);
  }

  protected list(
    request: PagedBookCategoriesRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._bookCategoryService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: BookCategoryDtoPagedResultDto) => {
        this.bookcategories = result.items;
        this.showPaging(result, pageNumber);
      });
  }

protected delete(bookcategory: BookCategoryDto): void {
    abp.message.confirm(
      this.l('BookCategoryDeleteWarningMessage', bookcategory.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._bookCategoryService.delete(bookcategory.id).subscribe(() => {
            abp.notify.success(this.l("SuccessfullyDeleted"));
            this.refresh();
          });
        }
      }
    );
  }

  private showCreateOrEditBookCategoriesModal(id?: number): void {
    let createOrEditBookCategoriesModal: BsModalRef;
    if (!id) {
      createOrEditBookCategoriesModal = this._modalService.show(
        CreateEditBookCategoryModalComponent,
        {
          class: "modal-lg",
        }
      );
    } else {
      createOrEditBookCategoriesModal = this._modalService.show(
        CreateEditBookCategoryModalComponent,
        {
          class: "modal-lg",
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditBookCategoriesModal.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
