import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navigation from "../components/Navigation";
import { connect } from "react-redux";
import { fetchNoteById, updateNote } from "../api";
import NotFound from "./NotFound";
import { mapStateToProps, mapDispatchToProps } from "../redux/reduxConnect";

function EditNote(props) {
  const navigate = useNavigate();
  const { noteId } = useParams();

  const [note, setNote] = useState({});
  const [errors, setErrors] = useState([]);
  const [noteExists, setNoteExists] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const fetchedNote = await fetchNoteById(noteId);
        if (!fetchedNote) {
          setNoteExists(false);
        } else {
          setNote(fetchedNote);
        }
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };

    fetchNote();
  }, [noteId]);

  const validateForm = () => {
    const errors = [];

    if (note.title.trim() === "") {
      errors.push("Title cannot be empty");
    }

    if (note.text.trim() === "") {
      errors.push("Note body cannot be empty");
    }

    return errors;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  };

  const handleSaveNote = async () => {
    const validationErrors = validateForm();

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        props.setLoading(true);

        const response = await updateNote(noteId, note);

        if (response) {
          navigate("/notes");
        } else {
          throw new Error("Error updating note");
        }
      } catch (error) {
        console.error("Error updating note:", error);
      } finally {
        props.setLoading(false);
      }
    }
  };

  if (!noteExists) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col items-center">
      <Navigation />
      <p className="text-left mt-4 ml-4 absolute top-0 left-0">
        Hello, {props.reduxUser.email}
      </p>
      <h1 className="text-3xl mt-8 mb-4 font-bold">Edit Note</h1>
      <div className="w-96">
        <label htmlFor="title" className="text-lg font-medium">
          Note Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={note.title || ""}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-lg py-2 px-3 mt-2 mb-4 w-full"
          required
        />
        <label htmlFor="text" className="text-lg font-medium">
          Note Text
        </label>
        <textarea
          id="text"
          name="text"
          value={note.text || ""}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-lg py-2 px-3 mt-2 mb-4 w-full"
        />
        <button
          onClick={handleSaveNote}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mr-2 font-bold"
        >
          Save
        </button>
        <Link
          to="/notes"
          className="bg-gray-300 text-gray-900 hover:bg-gray-400 hover:text-gray-900 py-2 px-4 rounded-lg mr-2 font-bold"
        >
          Back
        </Link>
        {errors.length > 0 && (
          <div className="text-red-500 text-center">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(EditNote);
