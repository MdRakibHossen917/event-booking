import React from "react";
import { Helmet } from 'react-helmet-async';
import CreateGroupForm from "./CreateGroupForm";


const CreateGroup = () => {
  return (
    <>
      <Helmet>
        <title>HobbyHub | Create Group</title>
      </Helmet>
      <div className="max-w-4xl mx-auto   bg-white shadow-md rounded">
      <h2 className="text-3xl font-bold   text-center text-gray-800">
        Create New Event
      </h2>
      <p className="text-center text-gray-700   max-w-7xl mx-auto">
        Create and manage exciting tour packages easily. Fill out the form below
        to add details about your new tour offering and attract travelers.
      </p>

      <CreateGroupForm />
    </div>
    </>
  );
};

export default CreateGroup;
