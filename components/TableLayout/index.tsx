"use client";
import "./style.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { FC, useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { HeaderTableLayoutContainer } from "./Styled";
import { ProgressBar } from "primereact/progressbar";

const TableLayout: FC<ITableLayout> = ({
  data,
  loading,
  columns,
  globalFilterFields,
  withSearchBar = true,
  withBtnAdd = true,
  setVisible,
}) => {
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    category: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });

  const templatePagination = {
    layout: "RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink",
    RowsPerPageDropdown: (options: any) => {
      const dropdownOptions = [
        { label: 10, value: 10 },
        { label: 20, value: 20 },
        { label: 50, value: 50 },
      ];
      return (
        <>
          <span className="mx-1">Items per page: </span>
          <Dropdown
            value={options.value}
            options={dropdownOptions}
            onChange={options.onChange}
          />
        </>
      );
    },
    CurrentPageReport: (options: any) => {
      return (
        <span
          style={{
            userSelect: "none",
            width: "120px",
            textAlign: "center",
          }}
        >
          {options.first} - {options.last} of {options.totalRecords}
        </span>
      );
    },
  };

  const dynamicColumns = columns.map((col: any, i: number) => {
    return (
      <Column
        key={i}
        field={col.field}
        header={col.header}
        sortable={col.sortable}
        body={col.body}
        className={`truncate`}
        style={col.style}
      />
    );
  });

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <HeaderTableLayoutContainer>
        {withSearchBar && (
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Search..."
            />
          </span>
        )}
        {withBtnAdd && (
          <Button
            label="Add New"
            severity="success"
            outlined
            icon="pi pi-plus"
            onClick={() => setVisible(true)}
          />
        )}
      </HeaderTableLayoutContainer>
    );
  };

  return (
    <>
      <div>
        <div className="card">
          <DataTable
            value={data}
            responsiveLayout="scroll"
            stripedRows
            paginator
            paginatorTemplate={templatePagination}
            first={0}
            rows={10}
            globalFilterFields={globalFilterFields}
            header={renderHeader}
            emptyMessage={loading ? "Loading..." : "Tidak ada data."}
            filters={filters}
            tableClassName="datatable-homepage"
          >
            {dynamicColumns}
          </DataTable>
        </div>
      </div>
    </>
  );
};

interface ITableLayout {
  data: any;
  loading: boolean;
  columns: any;
  globalFilterFields: any;
  withSearchBar: boolean;
  withBtnAdd: boolean;
  setVisible: (e: boolean) => void;
}

export default TableLayout;
