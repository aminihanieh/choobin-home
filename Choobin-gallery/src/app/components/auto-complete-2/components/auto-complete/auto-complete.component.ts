import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AutoCompleteComponent as kendoAutoCompleteComponent } from '@progress/kendo-angular-dropdowns';
@Component({
  selector: 'auto-complete-v2',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit {

  displayList: Array<any>;
  _dataSource: any[];
  @Input() get dataSource(): Array<any> {
    return this._dataSource;
  };
  set dataSource(value) {
    this._dataSource = value;
    this.displayList = value;
  }
  @Input() searchField: string;
  @Input() textField: string;
  @Input() valueField: string;
  @Input() defaultValue: string;
  @Input() placeHolder: string;
  @Input() selectedItem: any = {};

  @Output() selectedItemChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() filterChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() focus: EventEmitter<kendoAutoCompleteComponent> = new EventEmitter<kendoAutoCompleteComponent>();

  @ViewChild("autoCompleteInstance") autoCompleteInstance: kendoAutoCompleteComponent;

  ngOnInit() {
    if (this.defaultValue)
      this.setSelectedItemByTextOrValue(this.defaultValue)
  }

  private setSelectedItemByTextOrValue(inputValue: string | number) {
    if (inputValue && inputValue != " ") this.selectedItem = this.findItem(inputValue)
  }

  private findItem(text: string | number) {
    const item = this.displayList.find((data) => this.findItemInDataSearchField(data, text))
    return item ? item : null
  }

  private findItemInDataSearchField(data: any, text: any): boolean {
    return data[this.searchField].some((e: any) => e.toString().toLowerCase().includes(text?.toLowerCase()));
  }

  onFilterChange(value: string, autoComplete: kendoAutoCompleteComponent) {
    if (this.dataSource) {
      this.updateDisplayList(value, autoComplete);
      this.filterChange.emit(value);
    }
  }

  private updateDisplayList(value: string, autoComplete: kendoAutoCompleteComponent) {
    value ? this.filterDisplayList(value) : this.resetDisplayList(autoComplete)
  }

  private filterDisplayList(value: string) {
    this.displayList = this.dataSource.filter((item) => item[this.searchField].find((e: any) => e.toString().toLowerCase().indexOf(value.toLowerCase()) !== -1))
  }


  private resetDisplayList(autoComplete: kendoAutoCompleteComponent) {
    this.displayList = this.dataSource;
    this.selectedItem = null;
    this.openAutoComplete(autoComplete);
  }

  private openAutoComplete(autoComplete: kendoAutoCompleteComponent) {
    autoComplete.toggle(true);
  }

  onFocus(autoComplete: kendoAutoCompleteComponent) {
    this.openAutoComplete(autoComplete);
    this.focus.emit(autoComplete);
  }

  onFocusOut(autoComplete: kendoAutoCompleteComponent) {
    this.onValueChange(autoComplete.text);
  }

  onValueChange(arg: string | number) {
    if (!this.isSelectedItemRepeated(arg)) {
      this.setSelectedItemByTextOrValue(arg);
      this.ifSelectedItemIsNullResetDisplayList();
      this.selectedItemChange.emit(this.selectedItem);
      this.raiseValueChange();
    }
  }

  private isSelectedItemRepeated(arg: string | number) {
    return this.selectedItem && arg == this.selectedItem[this.textField];
  }

  private ifSelectedItemIsNullResetDisplayList() {
    if (!this.selectedItem) {
      this.displayList = this.dataSource;
      this.autoCompleteInstance.value = "";
    }
  }

  private raiseValueChange() {
    const value = this.selectedItem ? this.selectedItem[this.valueField] : null;
    this.valueChange.emit(value);
  }

}
