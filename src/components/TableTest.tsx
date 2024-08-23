import './tableTest.css';
import { useState } from 'react';

interface TableTestProps {
  rowsData: {
    [index: string]: string,
    // lastName: string,
    // startDate: string,
    // department: string,
    // dateOfBirth: string,
    // street: string,
    // city: string,
    // state: string,
    // zipCode: string
  }[]
}

function TableTest(props: TableTestProps) {
  const { rowsData } = props;
  const [rows, setRows] = useState(rowsData);

  // Handle search
  const [rowsToSearch, setRowsToSearch] = useState(rowsData);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredRows = rowsToSearch.filter((row) => {
      if(
        row.firstName.toLowerCase().includes((e.target.value).toLowerCase())
        || row.lastName.toLowerCase().includes((e.target.value).toLowerCase())
        || row.startDate.toLowerCase().includes((e.target.value).toLowerCase())
        || row.department.toLowerCase().includes((e.target.value).toLowerCase())
        || row.dateOfBirth.toLowerCase().includes((e.target.value).toLowerCase())
        || row.street.toLowerCase().includes((e.target.value).toLowerCase())
        || row.city.toLowerCase().includes((e.target.value).toLowerCase())
        || row.state.toLowerCase().includes((e.target.value).toLowerCase())
        || row.zipCode.toString().includes((e.target.value).toLowerCase())
      ) {
        return true;
      }
    })
    console.log(filteredRows)
    setRows(filteredRows);
    setPagination({
      ...pagination,
      start: 0,
      end: pagination.rowsPerPage
    });
  }

  // Handle filter columns
  const [filterOrder, setFilterOrder] = useState({
    order: '',
    numberOfClicks: 0
  });
  const filterBy = (filter: string) => {
    if(filterOrder.order !== filter) {
      // Explications
      // [...rows] - On va copier rows car .sort() modifie directement le tableau et on veut éviter un comportement inattendu
      // .sort() va nous permettre de trier le tableau dans l'ordre qu'on souhaite
      // On utilise la fonction localeCompare() pour comparer deux chaines de caractères 
      // localCompare renverra
      // -1 = plus grand que
      // 0 = egaux
      // 1 = plus petit que
      // Plus petit que veut dire qu'on est en train de trier par ordre alphabétique
      const sortedRows = [...rows].sort((a, b) => (a[filter].localeCompare(b[filter])));
      setFilterOrder({
        order: filter,
        numberOfClicks: 1
      })
      setRows(sortedRows);
    } else if(
      filterOrder.order === filter 
      && filterOrder.numberOfClicks % 2 !== 0
    ) {
      const sortedRows = [...rows].sort((a, b) => (b[filter].localeCompare(a[filter])));
      setFilterOrder({
        order: filter,
        numberOfClicks: filterOrder.numberOfClicks + 1
      })
      setRows(sortedRows);
    } else if(
      filterOrder.order === filter 
      && filterOrder.numberOfClicks % 2 === 0
    ) {
      const sortedRows = [...rows].sort((a, b) => (a[filter].localeCompare(b[filter])));
      setFilterOrder({
        order: filter,
        numberOfClicks: filterOrder.numberOfClicks + 1
      })
      setRows(sortedRows);
    }
  }

  // Handle pagination
  const defaultPaginationValue = 10;
  const [pagination, setPagination] = useState({
    rowsPerPage: defaultPaginationValue,
    start: 0,
    end: defaultPaginationValue,
  });
  const handleNextPage = () => {
    console.log(pagination.start)
    console.log(pagination.end)
    if(pagination.end === rows.length) {
      return;
    }
    if(rows.length - pagination.end < pagination.rowsPerPage) {
      return setPagination({
        ...pagination,
        start: pagination.start + pagination.rowsPerPage,
        end: rows.length
      })
    }
    setPagination({
      ...pagination,
      start: pagination.start + pagination.rowsPerPage,
      end: pagination.end + pagination.rowsPerPage
    })
  }
  const handlePrevPage = () => {
    console.log(pagination.start)
    console.log(pagination.end)
    console.log(rows.length)
    if(pagination.start === 0) {
      return;
    }
    if(pagination.end - pagination.start < pagination.rowsPerPage) {
      return setPagination({
        ...pagination,
        start: pagination.start - pagination.rowsPerPage,
        end: rows.length - (pagination.end - pagination.start)
      })
    }
    setPagination({
      ...pagination,
      start: pagination.start - pagination.rowsPerPage,
      end: pagination.end - pagination.rowsPerPage
    })
  }

  // Display rows
  const elements = [];
  if(pagination.end > rows.length) {
    pagination.end = rows.length
  }
  for(let i = pagination.start; i < pagination.end; i++) {
    elements.push(
      <tr key={i}>
      <th scope="row">{rows[i].firstName}</th>
      <td>{rows[i].lastName}</td>
      <td>{rows[i].startDate}</td>
      <td>{rows[i].department}</td>
      <td>{rows[i].dateOfBirth}</td>
      <td>{rows[i].street}</td>
      <td>{rows[i].city}</td>
      <td>{rows[i].state}</td>
      <td>{rows[i].zipCode}</td>
      </tr>
    )
  }

  return (
    <div className="VC-table-container">
      <div className="configuration-table-items-container">
        <div>
          <span>Show </span>
          <select onChange={(e) => setPagination({ rowsPerPage: parseInt(e.target.value), start: 0, end: parseInt(e.target.value)})}>
            <option value={defaultPaginationValue}>{defaultPaginationValue}</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span> entries</span>
        </div>
        <input onFocus={() => setRowsToSearch(rows)} onChange={handleSearch} type="text" placeholder="Search" />
      </div>
      {
        rows.length === 0 ? 
        <div className="VC-table-empty">This table is empty</div> :
        <table>
        <thead className="VC-table-thead">
          <tr>
            <th onClick={() => filterBy('firstName')} scope="col">First Name</th>
            <th onClick={() => filterBy('lastName')} scope="col">Last Name</th>
            <th onClick={() => filterBy('startDate')} scope="col">Start Date</th>
            <th onClick={() => filterBy('department')} scope="col">Department</th>
            <th onClick={() => filterBy('dateOfBirth')} scope="col">Date of Birth</th>
            <th onClick={() => filterBy('street')} scope="col">Street</th>
            <th onClick={() => filterBy('city')} scope="col">City</th>
            <th onClick={() => filterBy('state')} scope="col">State</th>
            <th onClick={() => filterBy('zipCode')} scope="col">Zip Code</th>
          </tr>
        </thead>
        <tbody>
          {elements}
        </tbody>
      </table>
      }
      <div className="VC-pagination">
        {
          rows.length === 0 ?
          <span>Showing 0 to 0 of 0 entries</span> :
          <span>Showing {pagination.start + 1} to {pagination.end} of {rows.length} entries</span>
        }
        <span className="VC-pagination-buttons-container">
          <button onClick={handlePrevPage}>Prev</button>
          <button onClick={handleNextPage}>Next</button>
        </span>
      </div>
    </div>
  );
}

export default TableTest;
