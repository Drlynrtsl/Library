import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
} from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  DepartmentDto,
  DepartmentServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "create-department-modal",
  templateUrl: "./create-edit-department-modal.component.html",
})
export class CreateEditDepartmentModalComponent
  extends AppComponentBase
  implements OnInit
{
  saving = false;
  department: DepartmentDto = new DepartmentDto();
  id: number = 0;
  @Output() onSave = new EventEmitter<any>();
  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _departmentService: DepartmentServiceProxy
  ) {
    super(injector);
  }
  ngOnInit(): void {
    if (this.id) {
      this._departmentService.get(this.id).subscribe((res) => {
        this.department = res;
      });
    }
  }
  save() {
    this.saving = true;
    if (this.id != 0) {
      this._departmentService.update(this.department).subscribe(
        (res) => {
          this.notify.info(this.l("SavedSuccessfully"));
          this.bsModalRef.hide();
          this.onSave.emit();
        },
        () => {
          this.saving = false;
        }
      );
    } else {
      this._departmentService.create(this.department).subscribe(
        (res) => {
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
