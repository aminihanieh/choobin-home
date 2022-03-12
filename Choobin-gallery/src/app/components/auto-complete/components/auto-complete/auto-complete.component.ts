import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { AutoCompleteComponent as kendoAutoCompleteComponent } from '@progress/kendo-angular-dropdowns';
@Component({
  selector: 'auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit {

  @Input() textField: string;
  @Input() defaultValue: string;
  @Input() valueField: string;
  @Input() placeHolder: string;

  _dataSource: any[];
  @Input() get dataSource(): Array<any> {
    return this._dataSource;
  };
  set dataSource(value) {
    this._dataSource = value;
    this.displayList = value;
  }

  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() filterChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() focus: EventEmitter<kendoAutoCompleteComponent> = new EventEmitter<kendoAutoCompleteComponent>();
  displayList: Array<any>;
  @Input() selectedItem: any = {};
  @Output() selectedItemChange: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild("autoCompleteInstance") autoCompleteInstance: kendoAutoCompleteComponent;

  ngOnInit() {
    this.initializeSelectedItem();
  }


  private initializeSelectedItem() {
    if (this.defaultValue || this.selectedItem) {
      this.defaultValue
        ? this.setSelectedItemByTextOrValue(this.defaultValue)
        : this.setSelectedItemByTextOrValue(this.selectedItem[this.textField]);
    }
  }

  onValueChange(arg: string | number) {

    if (this.isSelectedItemRepeated(arg)) return;
    this.setSelectedItemByTextOrValue(arg);
    this.selectedItemChange.emit(this.selectedItem);
    this.raiseValueChange();
  }

  private isSelectedItemRepeated(arg: string | number) {
    return this.selectedItem && arg == this.selectedItem[this.textField];
  }

  private raiseValueChange() {
    const emitValue = this.selectedItem ? this.selectedItem[this.valueField] : null;

    this.valueChange.emit(emitValue);
  }

  private setSelectedItemByTextOrValue(text: string | number) {
    let index = -1;

    if (text) {
      index = this.getExactItemIndex(text);
      if (index < 0) {
        index = this.getSimilarItemIndex(text);
      }
      if (index >= 0) {
        this.selectedItem = this.displayList[index];
      }
    }
    if (!text || index == -1)
      this.selectedItem = null;

  }

  private getExactItemIndex(text: any) {
    return this.displayList.findIndex((data) =>
      data[this.textField].toLowerCase() == text.toLowerCase());
  }

  private getSimilarItemIndex(text: any) {
    return this.displayList.findIndex((data) =>
      data[this.textField].toLowerCase().indexOf(text.toLowerCase()) !== -1
      ||
      data[this.valueField].toString().toLowerCase().indexOf(text.toLowerCase()) !== -1);
  }

  onFilterChange(value: string, autoComplete: kendoAutoCompleteComponent) {

    if (!this.dataSource) return;
    else {
      if (!value) this.resetFilters(autoComplete)
      this.setDisplayListAccordingToValueOrText(value);
    }
    this.filterChange.emit(value);
  }

  private resetFilters(autoComplete: kendoAutoCompleteComponent) {

    this.displayList = this.dataSource;
    this.selectedItem = null;
    this.openAutoComplete(autoComplete);
  }

  private openAutoComplete(autoComplete: kendoAutoCompleteComponent) {
    autoComplete.toggle(true);
  }

  private setDisplayListAccordingToValueOrText(value: string) {
    try {
      if (value) {
        this.displayList = this.dataSource.filter((item) => item[this.textField].toLowerCase().indexOf(value.toLowerCase()) !== -1
          ||
          item[this.valueField].toString().toLowerCase().indexOf(value.toLowerCase()) !== -1);
      }
    }
    catch (ex) {

    }
  }

  onFocus(autoComplete: kendoAutoCompleteComponent) {

    this.openAutoComplete(autoComplete);
    this.focus.emit(autoComplete);
  }
  onFocusOut(arg: FocusEvent, autoComplete: kendoAutoCompleteComponent) {

    this.onValueChange(autoComplete.text);
  }

}
