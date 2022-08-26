import styled from "styled-components";

const CoverPhoto = styled.img`
    position:absolute;
    width: 100%;
    min-height: 200px;
    z-index:1;
`
const ProPhoto = styled.img`
    position: absolute;
    top:130px;
    left:20px;
    height: 140px;
    width: 140px;
    border-radius: 50%;
    border: 5px solid #fff;
    z-index:2;
`

export default function EditModalTitle () {
    return(
        <div style={{position: "relative", height: "270px"}}>
            <CoverPhoto src={process.env.REACT_APP_IMG_PATH+'CoverPhoto1.png'} />
            <ProPhoto src={process.env.REACT_APP_IMG_PATH+'ProPhoto1.png'}/>
        </div>
    )
}