import { useNavigate } from 'react-router-dom'
import "../App.css"

function ErrorP() {

  let navigate = useNavigate();

  return (
    <div className="error-page">
      <div className="error-content">
        <div className='text-404'>404 Not Found</div>
        <button onClick={() => navigate('/')} className='link-home'>
          처음으로 돌아가기
        </button>
      </div>
    </div>
  )
}
export default ErrorP