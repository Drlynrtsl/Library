import { Component, Injector } from "@angular/core";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  AuthorDto,
  AuthorDtoPagedResultDto,
  AuthorServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { finalize } from "rxjs";
import { CreateEditAuthorModalComponent } from "./create-edit-authors-modal/create-edit-author-modal.component";

class PagedAuthorsRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: "./authors.component.html",
  animations: [appModuleAnimation()],
})
export class AuthorsComponent extends PagedListingComponentBase<AuthorDto> {
  authors: AuthorDto[] = [];
  id: number;
  keyword = "";
  isActive: boolean | null;

  constructor(
    injector: Injector,
    private _authorService: AuthorServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  protected list(
    request: PagedAuthorsRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._authorService
      .getAll(
        request.keyword,
        request.isActive,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: AuthorDtoPagedResultDto) => {
        this.authors = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(author: AuthorDto): void {
    abp.message.confirm(
      this.l("DepartmentDeleteWarningMessage", author.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._authorService.delete(author.id).subscribe(() => {
            abp.notify.success(this.l("SuccessfullyDeleted"));
            this.refresh();
          });
        }
      }
    );
  }

  createAuthor(){
    this.showCreateOrEditAuthormodal();
  }

  editAuthor(id){
    this.showCreateOrEditAuthormodal(id);
  }

  private showCreateOrEditAuthormodal(id?: number): void {
    let createOrEditAuthorModal: BsModalRef;
    if (!id) {
        createOrEditAuthorModal = this._modalService.show(
            CreateEditAuthorModalComponent,
        {
          class: "modal-lg",
        }
      );
    } else {
        createOrEditAuthorModal = this._modalService.show(
            CreateEditAuthorModalComponent,
        {
          class: "modal-lg",
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditAuthorModal.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
