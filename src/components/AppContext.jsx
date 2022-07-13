/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, createContext } from 'react';

export const AppContext = createContext();

export function AppContextProvider(props) {
  // Context variables definition
  const [summary, setSummary] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [dateEnd, setDateEnd] = useState();
  const [location, setLocationEvent] = useState();
  const [attendees, setAttendees] = useState([]);

  const deleteContext = () => {
    setSummary();
    setDescription();
    setDate();
    setDateEnd();
    setLocationEvent();
    setAttendees([]);
  };

  return (
    <AppContext.Provider
      value={{
        summary,
        setSummary,
        description,
        setDescription,
        date,
        setDate,
        dateEnd,
        setDateEnd,
        location,
        setLocationEvent,
        attendees,
        setAttendees,
        deleteContext,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
