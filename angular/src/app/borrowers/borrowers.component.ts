import { Component, Injector } from "@angular/core";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  BookDto,
  BookServiceProxy,
  BorrowerDto,
  BorrowerDtoPagedResultDto,
  BorrowerServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { finalize } from "rxjs/operators";
import { CreateEditBorrowerModalComponent } from "./create-edit-borrowers-modal/create-edit-borrower-modal.component";

class PagedBorrowersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector: "borrower",
  templateUrl: "./borrowers.component.html",
  animations: [appModuleAnimation()],
})
export class BorrowersComponent extends PagedListingComponentBase<BorrowerDto> {
  borrowers: BorrowerDto[] = [];
  id: number;
  keyword = "";
  isActive: boolean | null;
  today = new Date();
  isBorrowed = true;
  borrower = new BorrowerDto();
  bookId : number = 0;

  constructor(
    injector: Injector,
    private _borrowerService: BorrowerServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  createBorrower() {
    this.showCreateOrEditBorrowerModal();
  }

  editBorrower(id) {
    this.showCreateOrEditBorrowerModal(id);
  }

  protected list(
    request: PagedBorrowersRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._borrowerService
      .getAll(
        request.keyword, 
        request.skipCount, 
        request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: BorrowerDtoPagedResultDto) => {
        this.borrowers = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(borrower: BorrowerDto): void {
    abp.message.confirm(
      this.l("BorrowerDeleteWarningMessage", borrower.book.bookTitle),
      undefined,
      (result: boolean) => {
        if (result) {
          if (!borrower.returnDate) {
            this._borrowerService.updateIsBorrowedIfDeleted(borrower).subscribe(() => {
              this._borrowerService.delete(borrower.id).subscribe(() => {
                abp.notify.success(this.l("SuccessfullyDeleted"));
                this.refresh();
              });
            });
          } else {
            this._borrowerService.delete(borrower.id).subscribe(() => {
              abp.notify.success(this.l("SuccessfullyDeleted"));
              this.refresh();
            });
          }
        }
      }
    );
  }

  private showCreateOrEditBorrowerModal(id?: number): void {
    let createOrEditBorrowerModal: BsModalRef;
    if (!id) {
      createOrEditBorrowerModal = this._modalService.show(
        CreateEditBorrowerModalComponent,
        {
          class: "modal-lg",
        }
      );
    } else {
      createOrEditBorrowerModal = this._modalService.show(
        CreateEditBorrowerModalComponent,
        {
          class: "modal-lg",
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditBorrowerModal.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
