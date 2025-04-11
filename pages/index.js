import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';

function HomePage(props) {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  /*
  useEffect(() => {
    // request to get the data
    setLoadedMeetups(DUMMY_DATA);
  });
*/

  return <>
    <Head>
      <title>Next JS old way</title>
      <meta name="description" content="This is very different from the other meta approach where we just declared a reserved word object of meta."></meta>
    </Head>
    <h1>Home page</h1>
    <MeetupList meetups={props.meetups}></MeetupList>
  </>
}

export async function getStaticProps() {
  // no need to call api as getStaticProps is handled on the server
  const client = await MongoClient.connect('mongodb+srv://marcdavison77:XOHoKGyr562dxlrH@cluster0.zwqmw6v.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
  const db = client.db();
  // mongodb works with collections and documents
  const meetupsCollection = db.collection('meetups');
  
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  // executed in the build process
  // can execute code that would normally only run on a server.
  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      }))
    },
    revalidate: 10
  };
}

/*
export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;
  // get data, or check auth etc
  return {
    props: {
      meetups: DUMMY_DATA
    }
  };
}
  */

export default HomePage;