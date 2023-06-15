import { Component, Injector } from "@angular/core";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import {
  StudentDto,
  StudentServiceProxy,
  StudentDtoPagedResultDto,
  DepartmentDto
} from '@shared/service-proxies/service-proxies';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateEditStudentModalComponent } from './create-edit-student-modal/create-edit-student-modal.component';

class PagedStudentsRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
  
}

@Component({
  templateUrl: './students.component.html',
  animations: [appModuleAnimation()]
})
export class StudentsComponent extends PagedListingComponentBase<StudentDto> {
  students: StudentDto[] = [];
  id: number;
  keyword = '';
  isActive: boolean | null;
  departments: DepartmentDto[] = [];
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _studentService: StudentServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  createStudent(): void {
    this.showCreateOrEditStudentmodal();
  }
  editStudent(id): void {
    this.showCreateOrEditStudentmodal(id);
  }

  clearFilters(): void {
    this.keyword = '';
    this.isActive = undefined;
    this.getDataPage(1);
  }

  protected list(
    request: PagedStudentsRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._studentService
      .getAll(
        request.keyword, 
        request.skipCount, 
        request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: StudentDtoPagedResultDto) => {
        this.students = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(student: StudentDto): void {
    abp.message.confirm(
      this.l('StudentDeleteWarningMessage', student.studentName),
      undefined,
      (result: boolean) => {
        if (result) {
          this._studentService.delete(student.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }

  private showCreateOrEditStudentmodal(id?: number): void {
    let createOrEditStudentModal: BsModalRef;
    if (!id) {
      createOrEditStudentModal = this._modalService.show(CreateEditStudentModalComponent, {
        class: 'modal-lg',
      });
    } else {
      createOrEditStudentModal = this._modalService.show(CreateEditStudentModalComponent, {
        class: 'modal-lg',
        initialState: {
          id: id,
        },
      });
    }

    createOrEditStudentModal.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}