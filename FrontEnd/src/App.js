import Nav from './components/nav'
import JobList from './components/JobList';

function App() {

  const jobs = [
    {
      jobName: 'Job 1',
      companyName: 'Software Engineer ',
      companyPhoto: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Flogowik.com%2Forange-vector-logo-2443.html&psig=AOvVaw3tbzMNs9b9lMPZZnvSxz09&ust=1696257083743000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCJjQtJmI1YEDFQAAAAAdAAAAABAE',
      location: 'Cairo',
    },
    {
      jobName: 'Job 2',
      companyName: 'Company B',
      companyPhoto: 'companyB.jpg',
      location: 'Location B',
    },
    // Add more job objects as needed
  ];
  return (
   
    <div className='app'>
      
        
        <Nav/>
        <JobList jobs={jobs} />

     
    </div>
  );
}

export default App;
