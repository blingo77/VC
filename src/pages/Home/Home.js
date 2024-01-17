import './Home.css'
import Card from '../../cards/Card';
import rantCardImg from '../../images/face-angry-solid.svg'
import reviewCardImg from '../../images/star-half-stroke-solid.svg'
import loginCardImg from '../../images/loginCardImg.svg'

const Home = () => {

    const rantProps = {
        Title: "Rant",
        Text: `Does something about Las Vegas make you angry? Like road construction,
         traffic jams on the I-15, or maybe even the Raiders? Or maybe you just want to 
         get something off your chest and just vent your frustration to the world. If so
         go ahead and post a rant to let your neigbors know what you got to say. You can
         even post a rant completely Anonymously! `,
         URL: '/rants',
         IMG: rantCardImg
    }

    const reviewProps = {
        Title: "Review",
        Text: `Want to know the best places to go to in Las Vegas? Or maybe the places to avoid
        in Vegas? Then checkout the reviews people had to say about different spots in Vegas.
        Or maybe you had an amazing experience or an experience that left a sour taste in
        your mouth. Let your neighbor and even tourists, know the best spots even the worse spots!`,
        URL: '/reviews',
        IMG: reviewCardImg
    }

    const loginCardProps = {
        Title: "Login",
        Text: `Welcome to Vegas Circle, where everyone and everything is Vegas related.
        Skip all the sign up and inputing your private information by logging in with Google.
        We will automatically register an account for you using your Google Account. If you 
        don't have a Google account don't worry. We are currently working on adding more providers.`,
        URL: '/login',
        IMG: loginCardImg
    }

    return ( 
        <>
        <div className="main-home-container">
            <div className="card-holder-container">
                <div className="card1-container">
                    <Card Title={rantProps.Title} Text={rantProps.Text} URL={rantProps.URL} IMG={rantProps.IMG}></Card>
                </div>
                <div className="card2-container" >
                    <Card Title={reviewProps.Title} Text={reviewProps.Text} URL={reviewProps.URL} IMG={reviewProps.IMG}></Card>
                </div>
                <div className="card3-container">
                    <Card Title={loginCardProps.Title} Text={loginCardProps.Text} URL={loginCardProps.URL} IMG={loginCardProps.IMG}></Card>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default Home;