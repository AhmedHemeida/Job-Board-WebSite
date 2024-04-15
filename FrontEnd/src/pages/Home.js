 import AuthNav from '../components/AuthNav'
 import './Home.module.css'
 import img from '../photos/job.png'
 import styles from './Home.module.css';


 function Home (){
    return (
        <>

        <AuthNav/>
       
        <div className={styles.home}>
          
          <div className={styles.textContainer}>

            <h2 className={styles.H2}> Find Your Dream Job :)</h2>
            <p className={styles.P} > hello every one , you can search for a job or post job from our website.. </p>
          </div>
          <div className={styles.photo}>
            <img className={styles.jobimg} src={img} alt="Your Photo" />
          </div>
        </div>

        </>
      );
}



export default Home ;