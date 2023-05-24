import { useEffect} from 'react'

export default (selectedTitle, getSelectedTitle) => {
    useEffect(() => {
        getSelectedTitle(selectedTitle)
    }, [selectedTitle])
}
