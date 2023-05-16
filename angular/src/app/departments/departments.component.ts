import { Component, Injector, NgModule } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
    PagedListingComponentBase,
    PagedRequestDto
  } from 'shared/paged-listing-component-base';
  import {
    DepartmentServiceProxy,
    DepartmentDto,
    DepartmentDtoPagedResultDto
  } from '@shared/service-proxies/service-proxies';
  import { finalize } from 'rxjs/operators';

  class PagedDepartmentsRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | null;
  }

@Component({
    templateUrl: './departments.component.html',
    animations: [appModuleAnimation()]
  })

  export class DepartmentsComponent extends PagedListingComponentBase<DepartmentDto> {
    departments: DepartmentDto[] = [];
    keyword = '';
    isActive: boolean | null;
    advancedFiltersVisible = false;
    constructor(
        injector: Injector,
        private _departmentService: DepartmentServiceProxy
      ) {
        super(injector);
      }

      protected list(
        request: PagedDepartmentsRequestDto,
        pageNumber: number,
        finishedCallback: Function
      ): void {
        request.keyword = this.keyword;
        request.isActive = this.isActive;
    
        this._departmentService
          .getAll(
            request.keyword,
            request.skipCount,
            request.maxResultCount
          )
          .pipe(
            finalize(() => {
              finishedCallback();
            })
          )
          .subscribe((result: DepartmentDtoPagedResultDto) => {
            this.departments = result.items;
            this.showPaging(result, pageNumber);
          });
      }

      protected delete(department: DepartmentDto): void {
        abp.message.confirm(
          this.l('UserDeleteWarningMessage', department.name),
          undefined,
          (result: boolean) => {
            if (result) {
              this._departmentService.delete(department.id).subscribe(() => {
                abp.notify.success(this.l('SuccessfullyDeleted'));
                this.refresh();
              });
            }
          }
        );
      }
  }