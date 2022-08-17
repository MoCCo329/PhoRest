import { useLocation } from "react-router-dom"


export default function Ar () {
  const location = useLocation()
  console.log(location)
  
  return (
    <div>
      <script src="https://www.onirix.com/webar/ox-devicemotion.min.js"></script>
      <iframe
        id="visor"
        title="PhoRestAr"
        style={{position:'fixed',top:'0',left:'0',right:'0',bottom:'0',width:'100%',height:'100%',zIndex:'999',display:'block',border:'none'}}
        src={location.state.src}
        allow="camera;gyroscope;accelerometer;;magnetometer;fullscreen;xr-spatial-tracking">
      </iframe>
    </div>
  )
}