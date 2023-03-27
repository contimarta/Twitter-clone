import NewPeep from "./NewPeep/NewPeep.jsx";
import PeepList from "./PeepList/PeepList.jsx";

const Main = ({peeps, uploadPeeps,isLoggedIn}) =>{
    return(
    <div className="container">
          {isLoggedIn ? (
            <NewPeep uploadPeeps={uploadPeeps} />
          ) : (
            <em>
              <p>You need to log in to peep and add comments!</p>
            </em>
          )}
          {peeps.length > 0 ? (
            <PeepList
              peeps={peeps}
              uploadPeeps={uploadPeeps}
              isLoggedIn={isLoggedIn}
            />
          ) : (
            <p>Peeps are loading...</p>
          )}
        </div>
    )
}

export default Main;