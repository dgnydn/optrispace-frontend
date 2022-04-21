import { useState } from 'react';
import Router from 'next/router';

import {
  Button,
  Form,
  Input,
  Message,
  Grid,
  Header,
  TextArea,
} from 'semantic-ui-react';

import { useFetchPerson } from '../../lib/person';
import { createApplication } from '../../lib/api';

export default function JobCardForApplicant(props) {
  const { person } = useFetchPerson();
  const { job, renderHeader, renderDescription, renderStats } = props;

  const initialFields = {
    comment: "",
    price: "",
  };
  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState(undefined);

  const handleCreateApplication = e => {
    e.preventDefault();

    createApplication(
      person.id, // Token
      job.id,
      {...fields},
    ).then((application) => {
      if (!application.id) {
        setErrors(application.message)

        return;
      }

      Router.replace(`/jobs/${job.id}`)
    }).catch((err) => {
      console.error(err);
      throw err;
    })
  };

  const handleInputChange = e => {
    setFields({ ...fields, ...{ [e.target.id]: e.target.value } });
  };

  return (
    <>
      {renderHeader}

      {renderDescription}

      {renderStats}

      <Grid.Row>
        <Grid.Column>
          <Header as='h2' style={{ fontSize: '1.5em' }}>
            Оставить заявку ко проекту
          </Header>

          {errors && (
            <Message error header='Errors occured' list={typeof errors === 'Array' ? errors : [errors]} />
          )}

          <Form reply onSubmit={handleCreateApplication}>
            <Form.Field
              id='comment'
              control={TextArea}
              label='Опишите ваш опыт и почему надо выбрать именно вас'
              placeholder='1024 символа'
              maxlength={1024}
              rows={5}
              value={fields.comment}
              onChange={handleInputChange}
              required
            />

            <Form.Field
              id='price'
              control={Input}
              label='Укажите стоимость ваших услуг в рамках этого проекта'
              value={fields.price}
              onChange={handleInputChange}
              required
            />

            <Button content='Оставить заявку' labelPosition='left' icon='edit' primary />
          </Form>
        </Grid.Column>
      </Grid.Row>
    </>
  )
}
