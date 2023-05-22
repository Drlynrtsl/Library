import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
} from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  BookCategoryDto,
  BookCategoryServiceProxy,
  DepartmentDto,
  DepartmentServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "create-edit-bookcategory-modal",
  templateUrl: "./create-edit-bookcategory-modal.component.html",
})
export class CreateEditBookCategoryModalComponent
  extends AppComponentBase
  implements OnInit
{
  saving = false;
  bookcategory = new BookCategoryDto();
  departments: DepartmentDto[] = [];
  id: number = 0;
  selectedDepartment: number = null;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _bookCategoryService: BookCategoryServiceProxy,
    private _departmentService: DepartmentServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.id) {
      this._bookCategoryService.get(this.id).subscribe((res) => {
        this.bookcategory = res;
        this.selectedDepartment = this.bookcategory.departmentId;
      });
    }
    this._departmentService.getAllDepartments().subscribe((res) => {
      this.departments = res;
    });
  }

  save(): void {
    this.saving = true;
    this.bookcategory.departmentId = this.selectedDepartment;
    if (this.id !== 0) {
      this._bookCategoryService.update(this.bookcategory).subscribe(
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
      this._bookCategoryService.create(this.bookcategory).subscribe(
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
