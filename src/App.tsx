import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { Layout } from './components/layout/layout';
import { Results } from './pages/results/results';
import { DownloadResults } from './pages/downloadResults/downloadResults';
import { HashRouter } from 'react-router-dom';
import { AddResult } from './pages/addResult/addResult';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Navigate to="results" />}></Route>
        <Route
          path='results'
          element={
            <Layout>
              <Results></Results>
            </Layout>
          }
        />
        <Route
          path='downloadresults'
          element={
            <Layout>
              <DownloadResults></DownloadResults>
            </Layout>
          }
        />
        <Route
          path='addresult'
          element={
            <Layout isAddPage={true}>
              <AddResult></AddResult>
            </Layout>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
