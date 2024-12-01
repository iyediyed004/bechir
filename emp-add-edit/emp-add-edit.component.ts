import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { EmployeeService } from '../services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ModifierComponent } from '../modifier/modifier.component';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
})
export class EmpAddEditComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'Nom',
    'Prenom',
    'email',
    'Role',
    'Status',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService,
    private _coreService: CoreService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(ModifierComponent);
  }

  getEmployeeList() {
    this._empService.getAttenteList().subscribe({
      next: (res) => {
        console.log(res)

        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  verifEmployee(id: number) {
    this._empService.updateStatus(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('User verified!', 'done');
          this.getEmployeeList();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error verifying user:', err);
        this._coreService.openSnackBar('Failed to verify user.', 'close');
      },
    });
  }
  

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(ModifierComponent, {
      data,
    });
  }
  }
