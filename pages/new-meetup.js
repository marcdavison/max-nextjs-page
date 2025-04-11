import NewMeetupForm from '../components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';
import Head from 'next/head';

function NewMeetup() {
  const router = useRouter();
  async function addMeetupHandler(enteredMeetupData) {
    console.log(enteredMeetupData);
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();

    console.log(data);
    router.push('/');
  }
  return <>
      <Head>
      <title>Add a new meetup</title>
      <meta name="description" content="Add your own meetup page."></meta>
    </Head>
    <h1>NewMeetup page</h1>
    <NewMeetupForm onAddMeetup={addMeetupHandler}></NewMeetupForm>
  </>
}

export default NewMeetup;