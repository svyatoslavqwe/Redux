import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import CreateNote from "./pages/CreateNotes";
import Notes from "./pages/Notes";
import EditNote from "./pages/EditNote";
import ViewNote from "./pages/ViewNote";
import { store, persistor } from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Registration />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/createnote" element={<CreateNote />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/editnote/:noteId" element={<EditNote />} />
            <Route path="/viewnote/:noteId" element={<ViewNote />} />
          </Routes>
          <Footer />
        </Router>
      </PersistGate>
    </Provider>
  );
}
