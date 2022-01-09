import { useEffect } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import authService from "../../services/auth.service"

export function AuthorizationPage() {
    const [query] = useSearchParams()
    const code = query.get('code')
    const navigation = useNavigate()
    useEffect(() => {
        if(code) { 
            authService.setCode(code)
            navigation('/')
        }
    }, [])
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
            <h1 className="text-xl font-semibold">Connecting to github...</h1>
            <Link to="/" className="bg-gray-50 border-gray-200 border rounded shadow hover:bg-gray-100 mt-5 px-5 py-2">Return to home</Link>
        </div>
    )
}