import MeetupDetail from "../../components/meetups/MeetupDetails";
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";

function MeetUpDetails(props) {
 return <>
 <Head>
  <title>{props.meetUpData.title}</title>
  <meta name="description" content={props.meetUpData.description}></meta>
 </Head>
    <MeetupDetail 
  image={props.meetUpData.image}
  title={props.meetUpData.title}
  address={props.meetUpData.address}
  description={props.meetUpData.description}></MeetupDetail>
 </>
}

export default MeetUpDetails;

export async function getStaticPaths() {
  const client = await MongoClient.connect('mongodb+srv://marcdavison77:XOHoKGyr562dxlrH@cluster0.zwqmw6v.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
  const db = client.db();
  // .find(filtermethod, what from the document)
  const meetupIds = await db.collection('meetups').find({}, {
    _id: 1
  }).toArray();

  client.close();

  return {
    fallback: 'blocking',
    paths: meetupIds.map(meetup => ({
      params: {
        meetupid: meetup._id.toString()
      }
    })),
  }
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupid;
  const client = await MongoClient.connect('mongodb+srv://marcdavison77:XOHoKGyr562dxlrH@cluster0.zwqmw6v.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0');
  const db = client.db();
  // .find(filtermethod, what from the document)
  const selectedMeetup = await db.collection('meetups').findOne({ _id: ObjectId.createFromHexString(meetupId) });
  client.close(); 
  return {
    props: {
      meetUpData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      }
    }
  }
}