import MainLayout from "../../layouts/MainLayout";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/selectors.js";
import { Table } from 'dajr-valentin-p14-new';

function EmployeeList() {
  const rows = useSelector(getUser);
  const categories = [
    "firstName",
    "lastName",
    "startDate",
    "department",
    "dateOfBirth",
    "street",
    "city",
    "state",
    "zipCode",
  ]
  return (
    <MainLayout>
      <div id="employee-div" className="container">
        <h1>Current Employees</h1>
        <Table rowsData={rows} categories={categories} />
      </div>
    </MainLayout>
  );
}

export default EmployeeList;
