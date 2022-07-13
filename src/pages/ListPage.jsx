import React from 'react';
import {
  List,
  Page,
} from 'framework7-react';
import { getEvents } from '../js/db';
import Label from '../components/Label';

let events;
getEvents().then((e) => {
  events = e;
});

function ListPage() {
  return (
    <Page name="event">
      <div className="body">
        {events.map((e) => (
          <List inset>
            <Label text={e.summary} />
            <p>{e.description}</p>
            <p>{e.date_end.toDate().toLocaleString()}</p>
            <p>{e.date.toDate().toLocaleString()}</p>
          </List>
        ))}

      </div>
    </Page>
  );
}
export default ListPage;
