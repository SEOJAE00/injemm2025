import { useNavigate } from 'react-router-dom'
import "../App.css"

function ErrorP() {

  let navigate = useNavigate();

  return (
    <div className='error-page'>
      404
      <div onClick={()=>{navigate('/')}} className='link-home'>
        홈화면으로 이동하기
      </div>
    </div>
  )
}
export default ErrorP