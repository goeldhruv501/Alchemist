import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const StudentDashboard = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = sessionStorage.getItem('AcessToken')

    if (token) {
      window.location.href = 'https://mixolydian-neptune-51b.notion.site/Home-Page-1cb319b6085380bfb98cfc74dc970a94'
    } else {
      navigate('/login')
    }
  }, [navigate])

  return null
}

export default StudentDashboard
