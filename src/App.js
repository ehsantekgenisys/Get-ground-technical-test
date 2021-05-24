import { useCallback, useEffect } from 'react';
import { Provider, connect } from 'react-redux';
import Table from "./Table";
import { store } from './Redux/configure-store';
import "./App.css";
import { PostData } from './Api';

function RenderTable({ handleLoading, handleDataLoad, handleError }) {


  const loadData = useCallback(async ({ page, itemsPerPage, filters }) => {
    handleLoading(true);
    const resp = await PostData({ page: page || 1, itemsPerPage, filters });

    if (resp.count || resp.books) {
      updateUrl(page || 1);
      handleDataLoad({ ...resp, page, filters });
    }
    else {
      handleError(resp)
    }
  }, [handleDataLoad, handleLoading])

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const pageParam = queryParams.get("page");
    loadData({ page: pageParam || 1, itemsPerPage: 20, filters: [] })
  }, [loadData])

  function updateUrl(page) {
    const queryParams = new URLSearchParams(window.location.search);
    if (+page === 1) queryParams.delete("page");
    else queryParams.set("page", page);

    window.history.replaceState(null, null, queryParams.toString() ? "?" + queryParams.toString() : '/');
  }

  return <Table updateData={loadData} />
}

const mapDispatchToProps = dispatch => {
  return {
    handleLoading: (isloading) => dispatch({ type: 'LOAD_DATA', payload: isloading }),
    handleDataLoad: (data) => dispatch({ type: 'SAVE_DATA', payload: data }),
    handleError: (error) => dispatch({ type: 'SHOW_ERROR', payload: error }),
  }
};

const TableContainer = connect(null, mapDispatchToProps)(RenderTable);


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <TableContainer />
      </Provider>
    </div>
  );
}

export default App;
