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
  AuthorServiceProxy
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";

@Component({
  selector: "create-edit-author-modal",
  templateUrl: "./create-edit-author-modal.component.html",
})
export class CreateEditAuthorModalComponent
  extends AppComponentBase
  implements OnInit
{
  saving = false;
  author = new AuthorDto();
  id: number = 0;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public bsModalRef: BsModalRef,
    private _authorService: AuthorServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.id) {
      this._authorService
      .get(this.id)
      .subscribe((res) => {
        this.author = res;
      });
    }
  }

  save() {
    this.saving = true;
    if (this.id != 0) {
      this._authorService.update(this.author).subscribe(
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
      this._authorService.create(this.author).subscribe(
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
