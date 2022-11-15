import React from 'react'

function Test() {
    //해당 파일 이름을 백앤드에서 받아옴 
    const fileName = "1b8c4b4e-a75a-40f9-997e-1a6111f4726a";
    const bucketName = process.env.REACT_APP_BUCKET_NAME

    return (
        <div>
           <label htmlFor="upload" className="image-upload-wrapper">
            <img className="profile-img" 
                src={`https://` + bucketName + `.s3.ap-northeast-2.amazonaws.com/hay/vote/${fileName}.jpg`} 
                alt="업로드 이미지" />
            </label>
        </div>
    );
}

export default Test