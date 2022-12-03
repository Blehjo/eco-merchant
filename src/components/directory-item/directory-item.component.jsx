import { Link, useNavigate } from 'react-router-dom'
import { BackgroundImage, Body, DirectoryItemContainer } from './directory-item.styles.jsx'

const DirectoryItem = ({ category }) => {
    const { imageUrl, title } = category
    const navigate = useNavigate();
    return (
        <DirectoryItemContainer>
          <BackgroundImage
            imageUrl={imageUrl}
          />
          <Body onClick={()=> {navigate(`/shop/${title}`)}}>
            <h2>{title}</h2>
            <p>Shop Now</p>
          </Body>
        </DirectoryItemContainer>
    )
}

export default DirectoryItem;