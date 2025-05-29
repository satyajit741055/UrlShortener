import { useDispatch } from "react-redux"
import { Button } from "./ui/button"
import { SunMoonIcon } from "lucide-react"
import { toggle } from "@/features/reduxLogic/theme/themeSlice";



const ToggleTheme = () => {
    const dispatch = useDispatch();
    const toggleTheme = () =>{
        dispatch(toggle())
    }
  return (
    <div>
        <Button onClick={toggleTheme}>
            <SunMoonIcon />
        </Button>
    </div>
  )
}

export default ToggleTheme