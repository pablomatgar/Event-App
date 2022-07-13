import React, { useContext, useState } from 'react';
import {
  Page,
  List,
  ListInput,
  Button,
  f7,
} from 'framework7-react';
import Label from '../components/Label';
import { AppContext } from '../components/AppContext';

function EventPage() {
  // Context variables definition
  const {
    summary,
    setSummary,
    description,
    setDescription,
    date,
    setDate,
    dateEnd,
    setDateEnd,
  } = useContext(AppContext);

  const [summaryValid, setSummaryValid] = useState(false);
  const [descriptionValid, setDescriptionValid] = useState(false);
  const [dateValid, setDateValid] = useState(false);
  const [dateEndValid, setDateEndValid] = useState(false);

  const dateFormat = (d) => {
    if (d) {
      const month = d.getMonth() + 1;
      const day = d.getDate();
      const hours = d.getHours();
      const minutes = d.getMinutes();
      let monthStr = month;
      let dateStr = day;
      let hoursStr = hours;
      let minutesStr = minutes;
      if (month < 10) {
        monthStr = `0${month}`;
      }
      if (day < 10) {
        dateStr = `0${day}`;
      }
      if (hours < 10) {
        hoursStr = `0${hours}`;
      }
      if (minutes < 10) {
        minutesStr = `0${minutes}`;
      }
      return (`${d.getFullYear()}-${monthStr}-${dateStr}T${hoursStr}:${minutesStr}`);
    }

    return d;
  };

  const nextPage = () => {
    f7.views.current.router.navigate('/event2', {
      reloadAll: true,
      browserHistory: false,
      ignoreCache: true,
    });
  };

  return (
    <Page name="event">
      <div className="body">
        <List inset>
          <Label text="Event name" />
          <ListInput
            required
            className="event_input"
            type="text"
            placeholder="Meeting"
            clearButton
            validate
            value={summary || ''}
            onChange={(e) => { setSummary(e.target.value); }}
            onValidate={(isValid) => { setSummaryValid(isValid); }}
          />
        </List>
        <List inset>

          <Label text="Event description" />
          <ListInput
            required
            className="event_input"
            type="text"
            placeholder="Discussion about the next project"
            clearButton
            validate
            value={description || ''}
            onChange={(e) => { setDescription(e.target.value); }}
            onValidate={(isValid) => { setDescriptionValid(isValid); }}
          />
        </List>
        <List inset>
          <Label text="Start date" />
          <ListInput
            required
            className="event_input"
            type="datetime-local"
            min={new Date().toISOString().substring(0, 16)}
            clearButton
            validate
            value={dateFormat(date) || ''}
            onChange={(e) => { setDate(new Date(e.target.value)); }}
            onValidate={(isValid) => { setDateValid(isValid); }}
          />
        </List>
        <List inset>
          <Label text="End date" />
          <ListInput
            required
            className="event_input"
            type="datetime-local"
            min={dateFormat(date) || new Date().toISOString().substring(0, 16)}
            clearButton
            validate
            value={dateFormat(dateEnd) || ''}
            onChange={(e) => { setDateEnd(new Date(e.target.value)); }}
            onValidate={(isValid) => { setDateEndValid(isValid); }}
          />
        </List>
      </div>
      <Button className="button_yellow button_event bottom" onClick={nextPage} fill disabled={!(summaryValid && descriptionValid && dateValid && dateEndValid)}>Next</Button>

    </Page>
  );
}
export default EventPage;
