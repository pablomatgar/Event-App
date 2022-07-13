/* eslint-disable max-len */
import React, { useContext, useState } from 'react';
import {
  Page,
  List,
  ListInput,
  Button,
  f7,
} from 'framework7-react';
import Label from '../components/Label';
import { addEvent } from '../js/db';
import { AppContext } from '../components/AppContext';

function Event2Page() {
  const {
    summary,
    description,
    date,
    dateEnd,
    location,
    setLocationEvent,
    attendees,
    setAttendees,
    deleteContext,
  } = useContext(AppContext);

  const [attendee, setAttendee] = useState();

  const [attendeesValid, setAttendeesValid] = useState(false);
  const [locationValid, setLocationValid] = useState(false);

  const prevPage = () => {
    f7.views.current.router.navigate('/event', {
      reloadAll: true,
      browserHistory: false,
      ignoreCache: true,
    });
  };

  const createAlert = () => {
    f7.dialog.alert(`${summary} has been created.`, 'Event created', () => { deleteContext(); prevPage(); });
  };

  const createEvent = () => {
    const event = {
      summary,
      description,
      location,
      date,
      date_end: dateEnd,
      attendees,
    };
    addEvent(event);
    createAlert();
  };

  return (
    <Page name="event">
      <div className="body">

        <List inset>
          <Label text="Location" />
          <ListInput
            required
            className="event_input"
            type="text"
            placeholder="Office"
            clearButton
            validate
            value={location || ''}
            onChange={(e) => { setLocationEvent(e.target.value); }}
            onValidate={(isValid) => { setLocationValid(isValid); }}
          />
        </List>
        <List inset>
          <Label text="Attendees" />
          <div className="addBtnContainer">
            <ListInput
              required
              className="event_input"
              type="email"
              placeholder="mateos@asial.co.jp"
              clearButton
              value={attendee || ''}
              validate
              onChange={(e) => { setAttendee(e.target.value); }}
              onValidate={(isValid) => { setAttendeesValid(isValid); }}
            />
            <Button className="addButton" disabled={!attendeesValid} onClick={() => { setAttendees((attendees) => [...attendees, attendee]); setAttendee(); }}>+</Button>
          </div>
        </List>
        {attendees.map((a) => (
          <div key={a} className="attendeeDiv">
            <p className="attendee">{a}</p>
            <Button className="removeBt" onClick={() => setAttendees(attendees.filter((at) => at !== a))}>X</Button>
          </div>
        ))}
      </div>
      <div className="buttons bottom">
        <Button className="button_back button_event" onClick={prevPage} fill>Back</Button>
        <Button className="button_yellow button_input button_event" onClick={createEvent} fill disabled={!(locationValid && (attendees.length !== 0))}>Add event</Button>
      </div>

    </Page>
  );
}
export default Event2Page;
